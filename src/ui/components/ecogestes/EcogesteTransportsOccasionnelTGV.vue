<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets occasionnels en train 🚄
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Bravo, vous utilisez un des moyens de transports le moins émetteur de
        gaz à effet de serre !
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Et si jamais les trains son complets (week-ends longs, vacances) et
        que vous prendre votre voiture ayez les réflexes
        <span class="font-weight-bold"
          >covoiturage et
          <a
            target="_blank"
            href="https://particuliers.ademe.fr/au-bureau/deplacements/les-bons-plans-pour-moins-consommer-de-carburant"
            >écoconduite</a
          ></span
        >
        !
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
