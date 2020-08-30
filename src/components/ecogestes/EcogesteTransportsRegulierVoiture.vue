<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets réguliers en voiture 🚘
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Comme de nombre d'autres Français·es vous utilisez votre voiture pour
        vos trajets quotidiens. Plusieurs options s'offrent à vous pour réduire
        ces émissions:
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Adopter les gestes
        <span class="font-weight-bold">d'écoconduite</span>
        : vitesse modérée, conduite souple, et anticipation du freinage vous
        permettent de consommer moins de carburant et donc d'émettre moins de
        polluants.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Privilégier si possible
        <span class="font-weight-bold"
          >le covoiturage et/ou le télétravail</span
        >
        pour éviter d'être seul·e dans votre voiture.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Adopter
        <span class="font-weight-bold"
          >les transports en commun ou le vélo</span
        >
        si votre ville propose des infrastructures adaptées.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Enfin, vous pouvez changer de véhicule pour un
        <span class="font-weight-bold">modèle peu émetteur</span>.
      </v-card-text>
    </template>
  </ecogeste-popup>
</template>

<script lang="ts">
import Vue from 'vue'
import EcogesteBase from './EcogesteBase.vue'

export default Vue.extend({
  extends: EcogesteBase
})
</script>

<style scoped>
li {
  font-size: 1rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  text-align: start !important;
}
</style>
