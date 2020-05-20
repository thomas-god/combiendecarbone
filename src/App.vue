<template>
  <v-app id="app">
    <navbar />
    <v-container fluid :class="padding">
      <router-view id="content" />
    </v-container>
  </v-app>
</template>

<script>
import Navbar from './components/NavbarApp.vue'

export default {
  components: {
    Navbar
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black; /* #2c3e50; */
  background-color: #4caf50;
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
