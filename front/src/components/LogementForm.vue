<template>
  <v-card class="mx-auto my-3 pa-3" max-width="650px">
    <v-card-text class="text-justify">
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
    </v-card-text>
    <v-dialog
      v-model="form"
      max-width="550px"
      @click:outside="form = false"
      class="ma-0"
    >
      <v-card class="pa-3 ma-0">
        <v-card-title class="mb-0 pb-0 align-self-center">
          <p>Votre consommation</p>
        </v-card-title>
        <v-card-actions class="d-flex flex-column align-stretch">
          <v-form ref="form">
            <v-select
              :items="['Oui', 'Non']"
              label="Je connais mes factures d'énergie"
              v-model="factures.flag"
              required
              :rules="rulesReq"
            ></v-select>
            <v-text-field
              label="Facture d'éléctricité (MWh)"
              v-model="factures.elec"
              type="number"
              v-show="factures.flag === 'Oui'"
              min="0"
              step="0.05"
              :rules="rulesNum"
            ></v-text-field>
            <v-text-field
              label="Facture de gaz (MWh)"
              v-model="factures.gaz"
              type="number"
              v-show="factures.flag === 'Oui'"
              min="0"
              step="0.05"
              :rules="rulesNum"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn @click="validate" color="success">Ok</v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="mx-auto my-3">
      <v-card-title>Votre consommation</v-card-title>
      <v-card-text class="text-left">
        <p>Électricité: {{ factures.elec === '' ? 0 : factures.elec }} MWh</p>
        <p>Gaz: {{ factures.gaz === '' ? 0 : factures.gaz }} MWh</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" dark @click="form = true">Modifier</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: false,
      rulesReq: [value => !!value || 'Champs requis.'],
      rulesNum: [
        value => (value !== '' ? true : 'Doit être un nombre.'),
        value => (value >= 0 ? true : 'Doit être positif.')
      ]
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
    ...mapActions({
      updateFactures: 'logement/updateFactures'
    }),
    validate() {
      if (this.$refs.form.validate()) {
        this.updateFactures(this.factures)
        this.form = false
      }
    }
  }
}
</script>

<style></style>
