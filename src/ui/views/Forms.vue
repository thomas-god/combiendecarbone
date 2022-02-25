<template>
  <v-main class="mx-auto">
    <navbar-cat :categories="categories" :width_switch="width_small" />
    <router-view> </router-view>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarCat from '../components/NavbarCat.vue'

export default Vue.extend({
  components: {
    NavbarCat
  },
  data() {
    return {
      width_small: 620,
      categories: [
        'Transports',
        'Logement',
        'Alimentation',
        'Consommation',
        'Résultats'
      ]
    }
  }
})
</script>
