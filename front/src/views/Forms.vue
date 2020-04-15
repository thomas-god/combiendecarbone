<template>
  <v-content class="mx-auto">
    <v-app-bar
      scroll-off-screen
      width="100%"
      max-width="650px"
      color="#8BC34A"
      elevation="1"
      class="mx-auto my-0"
    >
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
          class="'white--text'"
          :class="class_btn(cat)"
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
    <router-view> </router-view>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      width_small: 620,
      navigation: [
        { name: 'Accueil', path: '/' },
        { name: 'Calculateur', path: '/forms/transports' },
        { name: 'Méthodologie', path: '/methodologie/accueil' }
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
    },
    class_btn(cat) {
      let base = 'white--text'
      if (cat !== this.current_cat) {
        if (this.$vuetify.breakpoint.width < this.width_small) {
          base += ' d-none'
        }
        base += ' btn_padding'
      } else {
        base += ' btn_selected_padding'
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
}
.btn_padding {
  padding-left: 9px !important;
  padding-right: 9px !important;
}
.btn_selected_padding {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
</style>
