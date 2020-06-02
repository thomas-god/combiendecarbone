<template>
  <v-app-bar
    width="100%"
    color="#607D8B"
    elevation="0"
    dense
    class="px-0 flex-grow-0"
  >
    <v-app-bar-nav-icon v-show="$vuetify.breakpoint.width < 600">
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
    <router-link
      v-for="route in navigation"
      :key="route.name"
      :to="route.path"
      v-show="$vuetify.breakpoint.width >= 600 || route.name === current_route"
    >
      <v-btn
        text
        class="white--text"
        :outlined="
          $vuetify.breakpoint.width >= 600 && route.name === current_route
        "
        >{{ route.name }}</v-btn
      >
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      width_small: 620,
      base_navigation: [
        { name: 'Accueil', path: '/' },
        { name: 'Calculateur', basePath: '/forms/' },
        { name: 'Méthodologie', basePath: '/methodologie/' }
      ]
    }
  },
  computed: {
    current_route() {
      return this.$route.meta.name
    },
    current_cat() {
      if (this.$route.meta.cat) {
        return this.$route.meta.cat !== 'Général'
          ? delAccentLower(this.$route.meta.cat)
          : 'transports'
      }
      return 'transports'
    },
    navigation() {
      this.base_navigation.forEach(s => {
        if (s.basePath) {
          s.path = s.basePath + this.current_cat
        }
      })
      return this.base_navigation
    },
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

function delAccentLower(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
</script>

<style scoped>
.v-toolbar__content {
  padding: 0 !important;
}

.v-btn--outlined {
  border-color: rgb(255, 255, 255) !important;
  border-width: 0 0 1px 0 !important;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
