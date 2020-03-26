<template>
  <div style="max-width: 800px; margin: auto">
    <div class="d-flex justify-space-between px-4">
      <v-btn icon @click="updateCatBtn(-1)" v-show="$vuetify.breakpoint.xsOnly">
        <v-icon>{{ prev }}</v-icon>
      </v-btn>
      <v-btn
        v-for="cat in categories"
        :key="cat"
        :text="cat !== current_cat || $vuetify.breakpoint.xsOnly"
        :outlined="cat === current_cat && $vuetify.breakpoint.smAndUp"
        @click="updateCat(cat)"
        :class="cat === current_cat ? active : inactive"
        >{{ cat }}</v-btn
      >
      <v-btn icon @click="updateCatBtn(1)" v-show="$vuetify.breakpoint.xsOnly">
        <v-icon>{{ next }}</v-icon>
      </v-btn>
    </div>
    <transports v-show="current_cat === 'Transports'" />
    <logement v-show="current_cat === 'Logement'" />
    <alimentation v-show="current_cat === 'Alimentation'" />
    <consommation v-show="current_cat === 'Consommation'" />
  </div>
</template>

<script>
import Transports from '../components/Transports.vue'
import Logement from '../components/Logement.vue'
import Alimentation from '../components/Alimentation.vue'
import Consommation from '../components/Consommation.vue'
import { mapGetters } from 'vuex'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

export default {
  components: {
    Transports,
    Logement,
    Alimentation,
    Consommation
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getCategoriesNames'
    })
  },
  data() {
    return {
      prev: mdiArrowLeft,
      next: mdiArrowRight,
      current_cat: '',
      active: '',
      inactive: 'hidden-xs-only'
    }
  },
  mounted() {
    this.current_cat = this.categories[0]
  },
  methods: {
    updateCat(cat) {
      this.current_cat = cat
    },
    updateCatBtn(val) {
      let cur_id = this.categories.findIndex(cat => cat === this.current_cat)
      let new_id = cur_id + val
      if (new_id >= 0 && new_id < this.categories.length) {
        this.current_cat = this.categories[new_id]
      }
    }
  }
}
</script>

<style></style>
