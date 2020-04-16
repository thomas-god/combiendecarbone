<template>
  <v-app-bar
    width="100%"
    color="#2E7D32"
    elevation="1"
    class="px-0 flex-grow-0"
  >
    <v-app-bar-nav-icon>
      <v-menu open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="route in navigation" :key="route.name">
            <v-list-item-title>
              <router-link :to="route.path">{{ route.name }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-nav-icon>
    <router-link v-for="route in navigation" :key="route.name" :to="route.path">
      <v-btn text class="white--text">{{ route.name }}</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      width_small: 620,
      navigation: [
        { name: 'Accueil', path: '/' },
        { name: 'Calculateur', path: '/forms/transports' },
        { name: 'Méthodologie', path: '/methodologie/general' }
      ]
    }
  },
  computed: {
    class_btn_cat_current() {
      let base = 'white--text'
      if (this.$vuetify.breakpoint.smAndUp) {
        base += ' px-2'
      }
      return base
    },
    class_btn_cat() {
      let base = this.class_btn_cat_current
      if (this.$vuetify.breakpoint.width < this.width_small) {
        base += ' d-none'
      }
      return base
    }
  }
}
</script>

<style scoped>
.v-toolbar__content {
  padding: 0 !important;
}

.v-btn--outlined {
  border-color: rgb(255, 255, 255) !important;
}
</style>
