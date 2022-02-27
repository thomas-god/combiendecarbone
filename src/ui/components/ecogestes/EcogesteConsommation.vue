<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Les émissions dues à votre consommation 👖📱
    </template>

    <template v-slot:text>
      <div>
        <v-card-text class="text-body-1 text-left pt-0">
          Réduire l'impact des objets que vous achetez peut se faire de 2 façons
          : achetant des produits dont les
          <span class="font-weight-bold"
            >procédés de fabrication sont respectueux de l'environnement</span
          >
          (moins d'émissions lors de la phase de fabrication), et en gardant vos
          appareils le
          <span class="font-weight-bold">
            plus longtemps possible et en leur offrant si possible une seconde
            vie
          </span>
          (moins d'objets fabriqués).
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Renseignez vous sur les éco-labels avant d'acheter un nouveau
          produit, sur sa consommation énergétique, sur la disponibilité des
          pièces détachées, etc.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 En cas de panne de nombreuses ressources en ligne sont maintenant
          disponibles pour réparer vous même vos appareils. Par exemple
          <a target="_blank" href="https://fr.ifixit.com/">Ifixit</a> pour vos
          téléphones et appareils électroniques.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Enfin si vous ne pouvez pas réparer vous même vos appareils vous
          pouvez les apporter dans une recyclerie qui aura peut être les
          compétences pour le réparer et lui donner une seconde vie, on bien
          saura faire usage de ses pièces détachées.
        </v-card-text>
      </div>

      <!-- Liens vers des ressources externes -->
      <div class="ecogestes_liens">
        <v-card-text class="text-body-1 text-left pt-0 pb-2">
          Enfin voici quelques ressources susceptibles de vous aider dans vos
          changements d'habitudes :
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Une liste des différents
          <a href="https://www.ademe.fr/labels-environnementaux" target="_blank"
            >éco-labels</a
          >
          pour vous aider à y voir plus clair dans vos achats,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 L'application
          <a href="https://www.clear-fashion.com/" target="_blank"
            >Clear Fashion</a
          >
          pour des achats textiles responsables,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 "Le revers de mon look", un guide de
          <a
            href="https://www.ademe.fr/sites/default/files/assets/documents/le-revers-de-mon-look.pdf"
            target="_blank"
            >l'ADEME</a
          >,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Une liste d'articles sur la consommation responsable sur le site de
          <a
            href="https://particuliers.ademe.fr/conso/conso-responsable"
            target="_blank"
            >l'ADEME pour les particuliers</a
          >.
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
