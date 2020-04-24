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

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['category'],
  computed: {
    ...mapGetters({
      getItems: 'consommation/getItemsByCategory',
      getConso: 'consommation/getConsoByCategory'
    }),
    items() {
      return this.getItems(this.category)
    },
    conso() {
      let conso = this.getConso(this.category)
      let conso_filter = {}
      for (let item in conso) {
        if (conso[item] > 0) {
          conso_filter[item] = {
            name: item,
            full_name: this.items.find(i => i.name === item).full_name,
            value: conso[item]
          }
        }
      }
      return conso_filter
    },
    conso_length() {
      return Object.keys(this.conso).length
    },
    subtitle() {
      if (this.category === 'Vêtements') {
        return `Nombre achetés par an`
      } else {
        return `Durée de vie (en années)`
      }
    }
  }
}
</script>

<style></style>
