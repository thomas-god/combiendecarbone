<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets occasionnels en voiture 🚘
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Comme de nombre d'autres Français·es vous utilisez votre voiture pour
        vos trajets occasionnels (week-ends, vacances). Plusieurs options
        s'offrent à vous pour réduire ces émissions:
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Adopter les gestes
        <span class="font-weight-bold"
          >d'<a
            target="_blank"
            href="https://particuliers.ademe.fr/au-bureau/deplacements/les-bons-plans-pour-moins-consommer-de-carburant"
            >écoconduite</a
          ></span
        >
        : vitesse modérée, conduite souple, et anticipation du freinage vous
        permettent de consommer moins de carburant et donc d'émettre moins de
        polluants.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Privilégier si possible
        <span class="font-weight-bold">le covoiturage</span>
        pour éviter d'être seul·e dans votre voiture.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Essayer de voir si vous pouvez utiliser
        <span class="font-weight-bold">le train ou le bus</span>.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Enfin, vous pouvez changer de véhicule pour un
        <span class="font-weight-bold">modèle peu émetteur</span>.
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
