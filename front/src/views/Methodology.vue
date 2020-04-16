<template>
  <v-content class="mx-auto">
    <navbar-cat :categories="categories" :width_switch="width_small" />
    <v-card max-width="700px" class="mx-auto pa-3">
      <v-card-text class="text-justify">
        <router-view> </router-view>
      </v-card-text>
    </v-card>
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
      width_small: 700,
      categories: [
        'Général',
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
