<template>
  <category :btnName="btnName">
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
      <logement-form @close="close"></logement-form>
    </template>

    <template v-slot:card>
      <logement-card />
    </template>
  </category>
</template>

<script>
import Category from '../base/Category.vue'
import LogementForm from './LogementForm.vue'
import logementCard from './LogementCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogementForm,
    logementCard,
    Category
  },
  computed: {
    ...mapGetters({ logement: 'logement/getConsommation' }),
    isLogementFilled() {
      return this.logement.type !== ''
    },
    btnName() {
      return this.isLogementFilled ? 'Modifier' : 'Répondre'
    }
  }
}
</script>

<style></style>
