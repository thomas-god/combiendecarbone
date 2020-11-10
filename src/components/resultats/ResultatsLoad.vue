<template>
  <v-btn @click="openSelectFile">
    Charger
    <input
      type="file"
      ref="load_ges_file"
      accept="*"
      style="display:none"
      @change="loadGes"
    />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { TransportsState } from '@/store/modules/transports'
import { AlimentationState } from '@/store/modules/alimentation'
import { LogementState } from '@/store/modules/logement'
import { ConsommationState } from '@/store/modules/consommation'
import { ServicesState } from '@/store/modules/services_publics'
import { GESFile } from './ResultatsSave.vue'
import { Travel } from '@/plugins/transports_ges'
import { UserForm } from '@/plugins/ges_logement'

const transports_module = namespace('transports')
const logement_module = namespace('logement')
const alimentation_module = namespace('alimentation')
const consommation_module = namespace('consommation')
const services_module = namespace('services')

@Component
export default class ResultatsLoad extends Vue {
  readonly version = '0.1.0'

  /**
   * Store items.
   */
  @transports_module.Mutation clearTravels!: () => Promise<void>
  @transports_module.Action insertTravel!: (travel: Travel) => Promise<void>
  @logement_module.Mutation('CLEAR_ALL_FORMS')
  clearLogementState!: () => Promise<void>
  @logement_module.Mutation('ADD_FORM') addLogementForm!: (
    form: UserForm
  ) => void
  @logement_module.Mutation('COMPUTE_GES') computeLogementGes!: () => void
  @alimentation_module.State regime!: AlimentationState['regime']
  @consommation_module.State consommation!: ConsommationState['consommation']
  @services_module.State items!: ServicesState['items']

  /**
   * Load methods.
   */
  openSelectFile(): void {
    const input = this.$refs['load_ges_file'] as HTMLInputElement
    input.click()
  }
  async loadGes() {
    const files = (this.$refs['load_ges_file'] as HTMLInputElement).files
    if (files === null) return
    if (files.length > 0) {
      const ges = JSON.parse(await files[0].text()) as GESFile

      /**
       * Load travels.
       */
      this.clearTravels()
      ges.transports.forEach(async travel => {
        await this.insertTravel(travel)
      })

      /**
       * Load logement.
       */
      this.clearLogementState()
      ges.logement.forEach(form => {
        this.addLogementForm(form)
      })
      this.computeLogementGes()
    }
  }
}
</script>

<style></style>
