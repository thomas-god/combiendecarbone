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
          v-model="user_consommation.type"
          required
          :rules="rulesReq"
        ></v-select>

        <!-- Factures connues -->
        <div v-if="user_consommation.type === 'factures'">
          <v-text-field
            label="Facture d'éléctricité (MWh)"
            v-model="user_consommation.factures.elec"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
          <v-text-field
            label="Facture de gaz (MWh)"
            v-model="user_consommation.factures.gaz"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
        </div>

        <!-- Factures non connues -->
        <div v-if="user_consommation.type === 'form'">
          <v-select
            label="Vos appareils basse consommation (classe A ou supérieure)"
            :items="equipementsFiltered"
            required
            :rules="rulesReq"
            v-model="user_consommation.form.equipements"
          ></v-select>
          <v-select
            label="Vous avez un chauffage"
            :items="chauffageFiltered"
            required
            :rules="rulesReq"
            v-model="user_consommation.form.chauffage"
          ></v-select>
          <v-select
            label="Votre niveau d'isolation"
            :items="isolationFiltered"
            required
            :rules="rulesReq"
            v-model="user_consommation.form.isolation"
          ></v-select>
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { UserForm } from '../../plugins/logement_ges'

export default Vue.extend({
  data() {
    return {
      rulesReq: [(value: any) => !!value || 'Champs requis.'],
      rulesNum: [
        (value: any) => (value !== '' ? true : 'Doit être un nombre.'),
        (value: any) => (value >= 0 ? true : 'Doit être positif.')
      ],
      user_consommation: {
        type: '',
        factures: { gaz: 0, elec: 0 },
        form: { isolation: '', equipements: '', chauffage: '' }
      } as UserForm
    }
  },
  computed: {
    ...mapGetters({
      equipements: 'logement/getEquipements',
      chauffage: 'logement/getChauffage',
      isolation: 'logement/getIsolation',
      consommation: 'logement/getConsommation'
    }),
    equipementsFiltered(): string[] {
      return this.equipements.filter((item: string) => item !== '')
    },
    chauffageFiltered(): string[] {
      return this.chauffage.filter((item: string) => item !== '')
    },
    isolationFiltered(): string[] {
      return this.isolation.filter((item: string) => item !== '')
    }
  },
  methods: {
    ...mapActions({
      updateConsommation: 'logement/updateConsommation'
    }),
    validate(): void {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.updateConsommation(this.user_consommation)
        this.$emit('close')
      }
    },
    resetForm(): void {
      this.user_consommation = JSON.parse(
        JSON.stringify(this.consommation as UserForm)
      ) as UserForm
      let form = this.$refs.form as Vue & { resetValidation: () => void }
      form.resetValidation()
    }
  }
})
</script>

<style></style>
