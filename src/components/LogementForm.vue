<template>
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
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
        this.$emit('close')
      }
    }
  }
}
</script>

<style></style>
