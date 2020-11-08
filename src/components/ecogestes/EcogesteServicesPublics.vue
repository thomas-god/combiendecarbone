<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Les émissions des services publics 🏥
    </template>

    <template v-slot:text>
      <div>
        <v-card-text class="text-body-1 text-left pt-0">
          Si nous ne pouvons pas directement réduire les émissions liées aux
          services publics que nous utilisons (santé, éducation, police,
          justice, etc.), nous pouvons quand même avoir un impact, avec notre
          bulletin de vote, mais aussi en s'impliquant et en participant dès que
          possible (concertations publiques, appels à projets, budgets
          participatifs, etc.).
        </v-card-text>
      </div>
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

.ecogestes_liens div.v-card__text  {
  padding-top: Opx;
}
</style>
