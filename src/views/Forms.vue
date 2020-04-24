<template>
  <v-content class="mx-auto">
    <navbar-cat :categories="categories" :width_switch="width_small" />
    <router-view> </router-view>
  </v-content>
</template>

<script>
import NavbarCat from '../components/NavbarCat.vue'

export default {
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
}
</script>
