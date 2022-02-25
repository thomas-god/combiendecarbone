<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets réguliers en train 🚄
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Bravo, vous utilisez un des moyens de transports le moins émetteur de
        gaz à effet de serre ! Cependant ce n'est pas parce que le train émet
        peu qu'il ne faut pas en faire un usage raisonné !
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Vous pouvez essayer d'en tirer le plus possible en
        <span class="font-weight-bold"
          >regroupant plusieurs rendez-vous ou réunions sur un même
          déplacement</span
        >. Et peut-être que certains de vos rendez-vous ne nécessitent pas
        toujours un déplacement et peuvent se faire en téléconférence !
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Enfin n'oubliez pas
        <span class="font-weight-bold"
          >vos déplacements sur les derniers kilomètres</span
        >
        : renseignez vous si vous pouvez vous rendre de la gare à votre
        destination finale en transports en commun ou en mobilité douce.
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
