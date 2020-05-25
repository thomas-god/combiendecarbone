<template>
  <category>
    <template v-slot:title>
      Votre consommation d'énergie
    </template>
    <template v-slot:text>
      <p>
        Le secteur résidentiel-tertiaire est directement à l'origine d'environ
        <a
          href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf"
          target="_blank"
          >17%</a
        >
        des émissions de gaz à effet de serre en France (la majorité pour nos
        besoins de chauffage), et ce sans compter les émissions indirectes dues
        à notre consommation d'électricité.
      </p>
      <p>
        Le moyen le plus fiable d'estimer l'impact de notre consommation de
        <strong>gaz</strong> et <strong>d'électricité</strong> est d'utiliser
        les mesures utilisées dans nos factures d'énergie.
      </p>
    </template>

    <template v-slot:form="{ close }">
      <logement-form @close="close"></logement-form>
    </template>

    <template v-slot:card>
      <v-card max-width="550px" class="mx-auto my-3">
        <v-card-title v-show="factures.flag === 'Oui'">
          Votre consommation
        </v-card-title>
        <v-card-text class="text-left" v-show="factures.flag === 'Oui'">
          <p>Électricité: {{ factures.elec === '' ? 0 : factures.elec }} MWh</p>
          <p>Gaz: {{ factures.gaz === '' ? 0 : factures.gaz }} MWh</p>
        </v-card-text>
      </v-card>
    </template>
  </category>
</template>

<script>
import { mapActions } from 'vuex'
import Category from './base/Category.vue'
import LogementForm from './LogementForm.vue'

export default {
  components: {
    LogementForm,
    Category
  },
  data() {
    return {
      form: false,
      form_touched: false
    }
  },
  computed: {
    factures: {
      get() {
        return this.$store.state.logement.factures
      },
      set(value) {
        mapActions('logement/updateFactures', value)
      }
    }
  },
  methods: {
    closeForm() {
      this.form = false
      this.form_touched = true
    }
  }
}
</script>

<style></style>
