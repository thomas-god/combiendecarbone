<template>
  <v-content class="mx-auto">
    <navbar-cat :categories="categories" :width_switch="width_small" />
    <v-card max-width="700px" class="mx-auto pa-7">
      <router-view class="methodologie"> </router-view>
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

<style>
.methodologie h2 {
  text-align: center;
  padding-bottom: 8px;
}
.methodologie h3 {
  font-size: 21px;
  margin-top: 16px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgb(133, 133, 133);
  text-align: start;
}

.methodologie h4 {
  font-size: 19px;
  text-align: start;
  margin-top: 14px;
  margin-bottom: 0px;
  padding-left: 5px;
}

.methodologie p {
  margin-bottom: 0 !important;
  text-align: justify;
}

.methodologie p + p {
  margin-top: 16px;
}

.methodologie ul {
  margin-bottom: 16px;
  text-align: justify;
}

.methodologie table {
  max-width: 300px;
  margin: auto;
}

.methodologie table thead th {
  padding-top: 10px;
  text-align: center !important;
}

.methodologie table {
  caption-side: bottom;
}

.methodologie table caption {
  padding-top: 5px;
  font-size: 0.875rem;
}
</style>
