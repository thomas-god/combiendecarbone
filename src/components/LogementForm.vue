<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center">
      <p>Votre consommation</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          :items="[
            { text: 'Oui', value: 'factures' },
            { text: 'Non', value: 'form' }
          ]"
          label="Je connais mes factures d'énergie"
          v-model="consommation.type"
          required
          :rules="rulesReq"
        ></v-select>

        <!-- Factures connues -->
        <div v-if="consommation.type === 'factures'">
          <v-text-field
            label="Facture d'éléctricité (MWh)"
            v-model="consommation.factures.elec"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
          <v-text-field
            label="Facture de gaz (MWh)"
            v-model="consommation.factures.gaz"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
        </div>

        <!-- Factures non connues -->
        <div v-if="consommation.type === 'form'">
          <v-select
            label="Vos appareils basse consommation (classe A ou supérieure)"
            :items="equipements"
            required
            :rules="rulesReq"
            v-model="consommation.form.equipements"
          ></v-select>
          <v-select
            label="Vous avez un chauffage"
            :items="chauffage"
            required
            :rules="rulesReq"
            v-model="consommation.form.chauffage"
          ></v-select>
          <v-select
            label="Votre niveau d'isolation"
            :items="isolation"
            required
            :rules="rulesReq"
            v-model="consommation.form.isolation"
          ></v-select>
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters({
      equipements: 'logement/getEquipements',
      chauffage: 'logement/getChauffage',
      isolation: 'logement/getIsolation'
    }),
    consommation: {
      get() {
        return this.$store.state.logement.consommation
      },
      set(value) {
        //? Dead code ?
        mapActions('logement/updateConsommation', value)
      }
    }
  },
  methods: {
    ...mapActions({
      updateConsommation: 'logement/updateConsommation'
    }),
    validate() {
      if (this.$refs.form.validate()) {
        this.updateConsommation(this.consommation)
        this.$emit('close')
      }
    }
  }
}
</script>

<style></style>
