<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Les émissions dues à votre logement 🏡
    </template>

    <template v-slot:text>
      <div>
        <v-card-text class="text-body-1 text-left pt-0">
          Afin de réduire les émissions dues à votre logement 2 voies,
          complémentaires, s'offrent à vous :
          <span class="font-weight-bold">réduire vos usages</span> ou remplacer
          vos appareils par
          <span class="font-weight-bold">des appareils plus efficaces</span>.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 L'hiver vous pouvez
          <span class="font-weight-bold"
            >baisser votre thermostat d'1 ou 2 degrés</span
          >
          (et porter un bon pull en laine), afin de diminuer vos besoins en
          chauffage.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Si votre logement n'est pas récent, des aides existent pour faire
          financer des
          <span class="font-weight-bold">travaux d'isolation</span> ou remplacer
          votre ancienne chaudière par une
          <span class="font-weight-bold">téchnologie plus récente</span> (pompe
          à chaleur, chaudière à condensation).
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 De même lorsque vous êtes amené·e à remplacer un équipement
          électrique, essayer d'en choisir un nouveau avec la
          <span class="font-weight-bold"
            >meilleure classe énergétique possible</span
          >
          !
        </v-card-text>
      </div>
      <!-- Liens vers des ressources externes -->
      <div class="ecogestes_liens">
        <v-card-text class="text-body-1 text-left pt-0 pb-2">
          Enfin voici quelques ressources susceptibles de vous aider dans vos
          changements d'habitudes :
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Suivre sa consommation d'électricité avec le
          <a
            href="https://www.compteur-linky.com/pratique/consommation_jour_le_jour_compteur_linky/"
            target="_blank"
            >compteur Linky</a
          >
          et sa consommation de gaz avec le
          <a
            href="https://www.grdf.fr/particuliers/suivi-consommation-gaz-naturel"
            target="_blank"
            >compteur Gazpar</a
          >,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 L'application
          <a href="https://www.rte-france.com/eco2mix" target="_blank"
            >éC02mix</a
          >
          pour connaître en temps réel les émissions de la production
          d'électricité en France,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Le site de l'ADEME pour les particuliers, rubrique
          <a href="https://particuliers.ademe.fr/maison" target="_blank"
            >maison</a
          >
          pour vos travaux de rénovation.
        </v-card-text>
      </div>
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

.ecogestes_liens div.v-card__text  {
  padding-top: Opx;
}
</style>
