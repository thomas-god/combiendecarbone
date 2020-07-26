<template>
  <v-card class="mx-auto my-3" v-show="isRegime">
    <v-card-title>Votre régime alimentaire</v-card-title>
    <v-card-text class="text-left">
      <p v-for="r in items" :key="r.name">{{ r.text }}: {{ regime[r.name] }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime',
      items: 'alimentation/getItems'
    }),
    isRegime() {
      return !Object.values(this.regime).some(item => item === '')
    }
  }
})
</script>

<style></style>
