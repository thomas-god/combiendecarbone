<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets réguliers en transports en commun 🚌
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Bravo ! vous utilisez déjà des modes de transports peu polluants 🎉 Si
        vous désirez aller encore plus loin, voici quelques idées:
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Essayer, si vous le pouvez,
        <span class="font-weight-bold"
          >le télétravail ou de décaler vos horaires</span
        >
        afin d'éviter de surcharger les transports en heure de pointe et ainsi
        permettre à plus d'usagers de pouvoir en bénéficier.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Adopter
        <span class="font-weight-bold">le vélo</span>
        si votre ville propose des infrastructures adaptées.
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
