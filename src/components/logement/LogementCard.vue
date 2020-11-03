<template>
  <v-card max-width="550px" class="mx-auto my-3">
    <!-- Card factures connues -->
    <div v-show="type === 'factures'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          Électricité:
          {{ factures.elec === '' ? 0 : factures.elec }}
          kWh
        </p>
        <p>
          Gaz:
          {{ factures.gaz === '' ? 0 : factures.gaz }}
          kWh
        </p>
      </v-card-text>
    </div>

    <!-- Card formulaire -->
    <div v-show="type === 'form'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>Équipements basse consommation : {{ form.equipements }}</p>
        <p>Chauffage : {{ form.chauffage }}</p>
        <p>Niveau d'isolation : {{ form.isolation }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { LogementFactures, LogementForm } from '@/plugins/logement_ges'

export default Vue.extend({
  computed: {
    ...mapGetters({
      consommation: 'logement/getConsommation'
    }),
    type(): string {
      return this.consommation.type
    },
    factures(): LogementFactures {
      return this.consommation.factures
    },
    form(): LogementForm {
      return this.consommation.form
    }
  }
})
</script>

<style></style>
