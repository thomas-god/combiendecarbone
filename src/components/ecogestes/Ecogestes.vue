<template>
  <component :is="ecogeste_component" v-model="display" />
</template>

<script lang="ts">
import Vue from 'vue'
import { GesItem } from '@/store/modules/ges'

export default Vue.extend({
  data() {
    return {
      ecogeste_component: () => import('./EcogesteVelo.vue'),
      display: false
    }
  },
  methods: {
    openEcogeste(ges_item: GesItem): void {
      this.ecogeste_component = this.loadEcogesteComponent(ges_item)
      this.display = true
    },
    loadEcogesteComponent(ges_item: GesItem) {
      if (ges_item.name === 'Électroménager') {
        return () => import('./EcogesteCovoiturage.vue')
      } else {
        return () => import('./EcogesteVelo.vue')
      }
    }
  }
})
</script>

<style></style>
