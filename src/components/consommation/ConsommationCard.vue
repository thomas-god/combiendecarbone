<template>
  <v-card v-if="conso_length > 0" class="ma-3">
    <v-card-title>
      {{ category }}
    </v-card-title>
    <v-card-subtitle class="text-left">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <ul>
        <li v-for="item in conso" :key="item.name" class="text-left">
          {{ item.full_name + ': ' + item.value }}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ConsommationItem } from '@/plugins/consommation_ges'

export default Vue.extend({
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getConso: 'consommation/getConsoByCategory'
    }),
    conso(): ConsommationItem[] {
      let conso: ConsommationItem[] = this.getConso(this.category)
      let conso_filter: ConsommationItem[] = []
      conso.forEach(item => {
        if (item.value > 0) {
          conso_filter.push(item)
        }
      })
      return conso_filter
    },
    conso_length(): number {
      return this.conso.length
    },
    subtitle() {
      if (this.category === 'Vêtements') {
        return `Nombre achetés par an`
      } else {
        return `Durée de vie (en années)`
      }
    }
  }
})
</script>

<style></style>
