<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vos trajets occasionnels en avion ✈️
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Un voyage en avion, l'avion étant déjà un des mode de transports les
        plus émetteurs de gaz à effet de serre, aura un impact d'autant plus
        grand pour des trajets de plusieurs milliers de kilomètres : un
        aller/retour Paris/New-York en avion émet 3 tonnes d'équivalent CO2,
        alors que la consommation annuelle d'une personne ne devrait pas
        dépasser 1 tonne ...
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Quand vous prenez vos billets regardez si votre destination est
        accessible
        <span class="font-weight-bold">en train ou bus</span>, certes le trajet
        sera plus long, mais l'empreinte carbone en sera bien réduite !
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Enfin si votre destination n'est accessible qu'en avion, regardez
        quand même si des destinations plus proches et accessibles en train ne
        vous donneraient pas envie :) Le
        <span class="font-weight-bold">tourisme local</span> regorge d'endroits
        insolites, dépaysants, etc.
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
