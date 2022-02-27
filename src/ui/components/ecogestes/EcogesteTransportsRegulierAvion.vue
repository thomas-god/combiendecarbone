<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets réguliers en avion ✈️
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        S'il est utilisé pour couvrir de longues distances en des temps records,
        l'avion reste un des mode de transport les plus émetteurs de gaz à effet
        de serre.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Si votre trajet ne peut être effectué en train en des temps
        raisonnables, vous pouvez essayer d'en tirer le plus possible en
        <span class="font-weight-bold"
          >regroupant plusieurs rendez-vous ou réunions sur un même
          déplacement</span
        >. Et peut-être que certains de vos rendez-vous ne nécessitent pas
        toujours un déplacement et peuvent se faire en téléconférence !
      </v-card-text>
      `
      <v-card-text class="text-body-1 text-left">
        🍃 Enfin n'oubliez pas
        <span class="font-weight-bold"
          >vos déplacements sur les derniers kilomètres</span
        >
        : renseignez vous si vous pouvez vous rendre de l'aéroport à votre
        destination finale en transports en commun ou en mobilité douce.
      </v-card-text>
    </template>
  </ecogeste-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import EcogesteBase from './EcogesteBase.vue';

export default Vue.extend({
  extends: EcogesteBase,
});
</script>

<style scoped>
li {
  font-size: 1rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  text-align: start !important;
}
</style>
