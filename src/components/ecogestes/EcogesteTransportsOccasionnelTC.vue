<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets occasionnels en transports en commun 🚌
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Bravo, vous utilisez un des moyens de transports le moins émetteur de
        gaz à effet de serre !
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Et si jamais vous deviez prendre votre voiture à la place, ayez les
        réflexes
        <span class="font-weight-bold">covoiturage et écoconduite</span> !
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
