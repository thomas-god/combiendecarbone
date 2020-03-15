<template>
  <div id="app">
    <div id="nav">
      <template v-for="link in links">
        <router-link :to="{ name: link.url }" class="spacing" :key="link.url">{{
          link.name
        }}</router-link>
        *
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Home',
          url: 'Home'
        },
        {
          name: 'Transports',
          url: 'formTransports'
        },
        {
          name: 'Logement',
          url: 'formLogement'
        },
        {
          name: 'Alimentation',
          url: 'formAlimentation'
        },
        {
          name: 'Consommation',
          url: 'formConso'
        }
      ]
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
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
.spacing {
  margin: 0 5px;
}
</style>
