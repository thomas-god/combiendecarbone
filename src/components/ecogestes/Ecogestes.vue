<template>
  <component :is="ecogeste_component" v-model="display" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      ecogeste_component: () => import('./EcogesteVelo.vue'),
      display: false
    }
  },
  methods: {
    openEcogeste(ges_item_name: string): void {
      this.ecogeste_component = this.loadEcogesteComponent(ges_item_name)
      this.display = true
    },
    loadEcogesteComponent(ges_item_name: string) {
      if (ges_item_name === 'Électroménager') {
        return () => import('./EcogesteCovoiturage.vue')
      } else {
        return () => import('./EcogesteVelo.vue')
      }
    }
  }
})
</script>

<style></style>
