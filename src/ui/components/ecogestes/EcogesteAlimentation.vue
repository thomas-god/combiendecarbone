<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title> Votre alimentation {{ emoji_title }} </template>

    <template v-slot:text>
      <!-- Palier 1 : max de viandes rouges/blanches -->
      <div v-if="props.palier === 1">
        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Comme nombre de Français·es vous consommez des viandes rouges
          {{ viande_rouge_def }} qui sont parmi les aliments les plus émetteurs
          de gaz à effet de serre. Pour réduire votre empreinte carbone vous
          pouvez essayer de réduire progressivement votre consommation de
          viandes rouges en la remplaçant soit par des viandes blanches
          {{ viande_blanche_def }}, ou, mieux, par des protéines végétales.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 En parallèle de la réduction de viandes rouges,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 2 : Plus de viandes rouges, encore des viandes blanches -->
      <div v-if="props.palier === 2">
        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Bravo, vous avez déjà fait beaucoup en réussissant à supprimer les
          viandes rouges {{ viande_rouge_def }} de votre alimentation ! Si vous
          souhaitez aller plus loin vous pouvez limiter ou supprimer les viandes
          blanches {{ viande_blanche_def }} de votre régime alimentaire.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 En parallèle de la réduction de viandes blanches,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 3 : Plus de viandes rouges, viandes blanches minimales -->
      <div v-if="props.palier === 3">
        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Bravo, vous avez déjà fait beaucoup en réussissant à supprimer les
          viandes rouges de votre alimentation ! Si vous souhaitez aller plus
          loin vous pouvez limiter ou supprimer les viandes blanches de votre
          régime alimentaire.
        </v-card-text>

        <v-card-text class="text-body-1 text-left pt-0">
          🍃 En parallèle de votre réduction de viandes blanches,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Paliers 4,5 : Plus de viandes, ni rouge ni blanche -->
      <div v-if="[4, 5].includes(props.palier)">
        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Bravo, vous avez réussi à supprimer toutes les viandes de votre
          alimentation ! Pour aller plus loin, {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 6 : Plus de viandes, ni rouge ni blanche, full local/bio -->
      <div v-if="props.palier === 6">
        <v-card-text class="text-body-1 text-left pt-0">
          🍃 Bravo, vous avez réussi à supprimer toutes les viandes de votre
          alimentation et ne consommez que des produits locaux, de saison et
          d'origine biologique ! L'impact de votre alimentation est maintenant
          le plus petit possible, vous pouvez être fier·ère de vous !
        </v-card-text>
      </div>

      <!-- Liens vers des ressources externes -->
      <div v-if="props.palier < 6" class="ecogestes_liens">
        <v-card-text class="text-body-1 text-left pt-0 pb-2">
          Enfin voici quelques ressources susceptibles de vous aider dans vos
          changements d'habitudes :
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 L'application
          <a
            href="https://etiquettable.eco2initiative.com/application/"
            target="_blank"
            >Etiquettable</a
          >
          pour vous aider à choisir fruits et légumes de saison et locaux,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Les articles du site de l'ADEME pour les particuliers, rubrique
          <a
            href="https://particuliers.ademe.fr/conso/alimentation"
            target="_blank"
            >alimentation</a
          >,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Le selection de recettes "Mieux manger" sur le site
          <a
            href="https://www.marmiton.org/mieux-cuisiner/mieux-manger-tp125264.html"
            target="_blank"
            >Marmiton</a
          >,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Le guide "Manger mieux, gaspiller moins" de
          <a
            href="https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-manger-mieux-gaspiller-moins.pdf"
            target="_blank"
            >l'ADEME</a
          >,
        </v-card-text>
        <v-card-text class="text-body-1 text-left pt-0 pb-2 pl-5">
          💡 Une liste des différents
          <a href="https://www.ademe.fr/labels-environnementaux" target="_blank"
            >éco-labels</a
          >
          pour vous aider à y voir plus clair dans vos achats.
        </v-card-text>
      </div>
    </template>
  </ecogeste-popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import EcogesteBase from './EcogesteBase.vue';

interface EcogesteProps {
  palier: number
}

export default Vue.extend({
  extends: EcogesteBase,
  props: {
    props: {
      type: Object as PropType<EcogesteProps>,
    },
  },
  data() {
    return {
      viande_rouge_def: '(bœuf, mouton, cheval)',
      viande_blanche_def: '(porc, veau, lapin, volailles)',
      txt_local_bio:
        "vous pouvez également essayer de consommer local (moins d'émissions de gaz à effet de serre liées au transport de vos aliments), et/ou bio (moins d'intrants artificiels utilisés).",
    };
  },
  computed: {
    emoji_title() {
      if (this.props.palier === 1) return '🥩';
      if ([2, 3].includes(this.props.palier)) return '🍗';
      if ([4, 5, 6].includes(this.props.palier)) return '🥦';
      return '🍽';
    },
  },
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
