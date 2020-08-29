<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Les émissions dues à votre logement 🏡
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Afin de réduire les émissions dues à votre logement 2 voies,
        complémentaires, s'offrent à vous :
        <span class="font-weight-bold">réduire vos usages</span> ou remplacer
        vos appareils par
        <span class="font-weight-bold">des appareils plus efficaces</span>.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 L'hiver vous pouvez
        <span class="font-weight-bold"
          >baisser votre thermostat d'1 ou 2 degrés</span
        >
        (et porter un bon pull en laine), afin de diminuer vos besoins en
        chauffage.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Si votre logement n'est pas récent, des aides existent pour faire
        financer des
        <span class="font-weight-bold">travaux d'isolation</span> ou remplacer
        votre ancienne chaudière par une
        <span class="font-weight-bold">téchnologie plus récente</span> (pompe à
        chaleur, chaudière à condensation).
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 De même lorsque vous êtes amené·e à remplacer un équipement
        électrique, essayer d'en choisir un nouveau avec la
        <span class="font-weight-bold"
          >meilleure classe énergétique possible</span
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
