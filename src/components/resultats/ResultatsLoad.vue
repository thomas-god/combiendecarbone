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
  @transports_module.State travels!: TransportsState['travels']
  @logement_module.State forms!: LogementState['forms']
  @alimentation_module.State regime!: AlimentationState['regime']
  @consommation_module.State consommation!: ConsommationState['consommation']
  @services_module.State items!: ServicesState['items']

  /**
   * Load methods.
   */
  ges = {}
  openSelectFile(): void {
    const input = this.$refs['load_ges_file'] as HTMLInputElement
    input.click()
  }
  loadGes() {
    const files = (this.$refs['load_ges_file'] as HTMLInputElement).files
    if (files === null) return
    if (files.length > 0) {
      files[0].text().then(val => {
        this.ges = JSON.parse(val) as GESFile
      })
    }
  }
}
</script>

<style></style>
