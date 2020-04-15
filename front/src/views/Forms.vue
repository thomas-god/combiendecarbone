<template>
  <div class="mx-auto">
    <v-app-bar
      app
      scroll-off-screen
      width="100%"
      color="#2E7D32"
      elevation="1"
      class="px-0"
    >
      <v-app-bar-nav-icon absolute>
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

      <div class="d-flex justify-space-between align-center px-0 mx-auto">
        <v-btn
          icon
          @click="updateCatBtn(-1)"
          v-show="$vuetify.breakpoint.width < width_small"
          class="white--text"
          :disabled="current_cat === 'Transports'"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          v-for="cat in categories"
          :key="cat"
          text
          :outlined="
            cat === current_cat && $vuetify.breakpoint.width > width_small
          "
          @click="updateCat(cat)"
          :class="cat === current_cat ? class_btn_cat_current : class_btn_cat"
          :width="$vuetify.breakpoint.width < width_small ? '170px' : 'auto'"
          :small="
            $vuetify.breakpoint.width < 700 &&
              $vuetify.breakpoint.width > width_small
          "
        >
          {{ cat }}
        </v-btn>
        <v-btn
          icon
          @click="updateCatBtn(1)"
          v-show="$vuetify.breakpoint.width < width_small"
          class="white--text"
          :disabled="current_cat === 'Résultats'"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      width_small: 620,
      navigation: [
        { name: 'Accueil', path: '/' },
        { name: 'Calculateur', path: '/forms' },
        { name: 'Méthodologie', path: '/methodologie' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getCategoriesNames'
    }),
    current_cat() {
      if (this.$route.meta.cat) {
        return this.$route.meta.cat
      } else {
        return ''
      }
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
  },
  methods: {
    updateCat(cat) {
      let old_path = this.$route.path.split('/')
      old_path[old_path.length - 1] = delAccentLower(cat)
      let new_path = old_path.join('/')
      this.$router.push(new_path)
    },
    updateCatBtn(val) {
      let cur_id = this.categories.findIndex(cat => cat === this.current_cat)
      let new_id = cur_id + val
      if (new_id >= 0 && new_id < this.categories.length) {
        this.updateCat(this.categories[new_id])
      }
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
}
</style>
