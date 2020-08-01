<template>
  <v-app id="app">
    <navbar />
    <v-container fluid :class="padding">
      <router-view id="content" />
    </v-container>
    <footer-app v-if="true" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from './components/NavbarApp.vue'
import FooterApp from '@/components/FooterApp.vue'

export default Vue.extend({
  components: {
    Navbar,
    FooterApp
  },
  data() {
    return {
      links: [
        {
          name: 'Home',
          url: 'Home'
        },
        {
          name: 'Calculateur',
          url: 'forms'
        }
      ]
    }
  },
  computed: {
    padding() {
      return `pa-${this.$vuetify.breakpoint.width > 600 ? 4 : 0}`
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black; /* #2c3e50; */
  background-color: #eceff1;
  word-break: normal;
  hyphens: auto;
}

#app p,
#app li {
  font-size: 1.1rem;
  color: black;
  line-height: 25px;
}
</style>
