<template>
  <component
    :is="ecogeste_component"
    v-model="display"
    :props="ecogeste_component_props"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { GESItem } from '@/ui/store/modules/ges'

export default Vue.extend({
  data() {
    return {
      ecogeste_component: () => import('./EcogesteSuggestion.vue') as any,
      ecogeste_component_props: {} as any,
      display: false
    }
  },
  methods: {
    openEcogeste(ges_item: GESItem): void {
      this.ecogeste_component = this.loadEcogesteComponent(ges_item)
      this.display = true
    },
    loadEcogesteComponent(ges_item: GESItem) {
      if (ges_item.ecogeste?.name) {
        this.ecogeste_component_props = ges_item.ecogeste?.props
          ? ges_item.ecogeste.props
          : {}
        return () => import(`./${ges_item.ecogeste?.name}.vue`)
      } else {
        this.ecogeste_component_props = {}
        return () => import('./EcogesteSuggestion.vue')
      }
    }
  }
})
</script>

<style></style>
