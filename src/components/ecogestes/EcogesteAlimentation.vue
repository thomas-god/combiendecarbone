<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title> Votre alimentation {{ emoji_title }} </template>

    <template v-slot:text>
      <!-- Palier 1 : max de viandes rouges/blanches -->
      <div v-if="props.palier === 1">
        <v-card-text class="text-body-1 text-left">
          Comme nombre de Français·es vous consommez des viandes rouges
          {{ viande_rouge_def }} qui sont parmi les aliments les plus émetteurs
          de gaz à effet de serre. Pour réduire votre empreinte carbone vous
          pouvez essayer de réduire progressivement votre consommation de
          viandes rouges en la remplaçant soit par des viandes blanches
          {{ viande_blanche_def }}, ou encore mieux par des protéines végétales.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 Pour vous aidez voici quelques liens vers des recettes à base de
          protéines végétales.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 En parallèle de votre réduction de viandes rouges,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 2 : Plus de viandes rouges, encore des viandes blanches -->
      <div v-if="props.palier === 2">
        <v-card-text class="text-body-1 text-left">
          Bravo, vous avez déjà fait beaucoup en réussissant à supprimer les
          viandes rouges de votre alimentation ! Si vous souhaitez aller plus
          loin vous pouvez limiter ou supprimer les viandes blanches de votre
          régime alimentaire.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 Pour vous aidez voici quelques liens vers des recettes à base de
          protéines végétales.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 En parallèle de votre réduction de viandes blanches,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 3 : Plus de viandes rouges, viandes blanches minimales -->
      <div v-if="props.palier === 3">
        <v-card-text class="text-body-1 text-left">
          Bravo, vous avez déjà fait beaucoup en réussissant à supprimer les
          viandes rouges de votre alimentation ! Si vous souhaitez aller plus
          loin vous pouvez limiter ou supprimer les viandes blanches de votre
          régime alimentaire.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 Pour vous aidez voici quelques liens vers des recettes à base de
          protéines végétales.
        </v-card-text>

        <v-card-text class="text-body-1 text-left">
          🍃 En parallèle de votre réduction de viandes blanches,
          {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Paliers 4,5 : Plus de viandes, ni rouge ni blanche -->
      <div v-if="[4, 5].includes(props.palier)">
        <v-card-text class="text-body-1 text-left">
          Bravo, vous avez réussi à supprimer toutes les viandes de votre
          alimentation ! Pour aller plus loin, {{ txt_local_bio }}
        </v-card-text>
      </div>

      <!-- Palier 6 : Plus de viandes, ni rouge ni blanche, full local/bio -->
      <div v-if="props.palier === 6">
        <v-card-text class="text-body-1 text-left">
          Bravo, vous avez réussi à supprimer toutes les viandes de votre
          alimentation et ne consommer que des produits locaux et d'origine
          biologique ! L'impact de votre alimentation est maintenant le plus
          petit possible, vous pouvez être fier·ère de vous !
        </v-card-text>
      </div>
    </template>
  </ecogeste-popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import EcogesteBase from './EcogesteBase.vue'

interface EcogesteProps {
  palier: number
}

export default Vue.extend({
  extends: EcogesteBase,
  props: {
    props: {
      type: Object as PropType<EcogesteProps>
    }
  },
  data() {
    return {
      viande_rouge_def: '(bœuf, agneau)',
      viande_blanche_def: '(volaille, dinde)',
      txt_local_bio:
        "vous pouvez également essayer de consommer local (moins d'émissions de gaz à effet de serre liées au transport de vos aliments), et/ou bio (moins d'intrants artificiels utilisés)."
    }
  },
  computed: {
    emoji_title() {
      if (this.props.palier === 1) return '🥩'
      else if ([2, 3].includes(this.props.palier)) return '🍗'
      else if ([4, 5, 6].includes(this.props.palier)) return '🥦'
      else return '🍽'
    }
  }
})
</script>

<style scoped>
li {
  font-size: 1rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  text-align: start !important;
}
</style>
