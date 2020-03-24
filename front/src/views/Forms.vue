<template>
  <div>
    <div>
      <v-btn icon @click="updateCatBtn(-1)" v-show="$vuetify.breakpoint.xsOnly">
        <v-icon>{{ prev }}</v-icon>
      </v-btn>
      <v-btn
        v-for="cat in categories"
        :key="cat"
        :text="cat !== current_cat"
        :outlined="cat === current_cat"
        @click="updateCat(cat)"
        :class="cat === current_cat ? active : inactive"
        class="px-2 body-2"
        >{{ cat }}</v-btn
      >
      <v-btn icon @click="updateCatBtn(1)" v-show="$vuetify.breakpoint.xsOnly">
        <v-icon>{{ next }}</v-icon>
      </v-btn>
    </div>

    <transports-form v-show="current_cat === 'Transports'" />
  </div>
</template>

<script>
import TransportsForm from '../components/TransportsForm.vue'
import { mapGetters } from 'vuex'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

export default {
  components: {
    TransportsForm
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
