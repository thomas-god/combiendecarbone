<template>
  <category :btnName="btnName" @opening="resetForm">
    <template v-slot:title>
      Votre consommation d'énergie
    </template>
    <template v-slot:text>
      <p>
        Pour estimer l'impact de votre logement (chauffage, eau chaude
        sanitaire, appareils électriques, etc.) commencez par renseigner vos
        consommation <em>annuelles</em> d'électricité et/ou de gaz, que vous
        pouvez trouver sur les factures de vos fournisseurs d'énergie. Si vous
        ne les connaissez pas ou n'en avez pas, nous vous proposons de répondre
        à un rapide questionnaire pour estimer de vos consommation en se basant
        sur les moyennes nationales.
      </p>
    </template>

    <template v-slot:form="{ close }">
      <logement-form @close="close" ref="form" :form_id="form_id"/>
    </template>

    <template v-slot:card>
      <logement-card :form_id="form_id" />
    </template>
  </category>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Category from '../base/Category.vue'
import LogementForm from './LogementForm.vue'
import logementCard from './LogementCard.vue'
import { UserForm } from '@/plugins/ges_logement'

const logement_module = namespace('logement')

@Component({
  components: {
    LogementForm,
    logementCard,
    Category
  }
})
export default class Logement extends Vue {
  @logement_module.Getter forms!: UserForm[]

  get isLogementFilled() {
    return this.forms.length > 0
  }
  get btnName() {
    return this.isLogementFilled ? 'Modifier' : 'Répondre'
  }
  async resetForm() {
    await this.$nextTick()
    const form = this.$refs.form as Vue & { resetForm: () => void }
    //form.resetForm()
  }
  get form_id(): number {
    return this.forms.length > 0 ? this.forms[0].id : -1
  }
}
</script>

<style></style>
