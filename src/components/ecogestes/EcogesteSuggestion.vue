<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Nous n'avons pas trouvé d'écogeste correspondant 😢
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1">
        Si des écogestes pour ce sujet vous intéressent, ou bien si vous avez
        des idées d'écogestes à nous proposer, n'hésitez pas à nous le faire
        savoir sur
        <a
          href="https://github.com/thomas-god/combiendecarbone/issues/new?assignees=&labels=&template=demande-de-nouvelle-fonctionnalit-.md&title="
          target="_blank"
          >GitHub</a
        >,
        <a href="https://twitter.com/Combiendeco2" target="_blank">Twitter</a>,
        ou bien encore directement par
        <a href="mailto:contact@combiendecarbone.fr">mail</a> !
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

<style></style>
