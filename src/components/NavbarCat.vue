<template>
  <v-app-bar
    width="100%"
    max-width="700px"
    elevation="5"
    color="#43A047"
    class="mx-auto my-0 sticky_navbar"
  >
    <div class="d-flex justify-space-between align-center flex-grow-1 px-0">
      <v-btn
        icon
        @click="updateCatBtn(-1)"
        v-show="$vuetify.breakpoint.width < width_switch"
        class="white--text"
        :disabled="current_cat === categories[0]"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        v-for="cat in categories"
        :key="cat"
        text
        :outlined="
          cat === current_cat && $vuetify.breakpoint.width > width_switch
        "
        @click="updateCat(cat)"
        class="body-2"
        :class="class_btn(cat)"
        :width="$vuetify.breakpoint.width < width_switch ? '170px' : 'auto'"
      >
        {{ cat }}
      </v-btn>
      <v-btn
        icon
        @click="updateCatBtn(1)"
        v-show="$vuetify.breakpoint.width < width_switch"
        class="white--text"
        :disabled="current_cat === categories[categories.length - 1]"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  props: ['categories', 'width_switch'],
  computed: {
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
      let old_cat = old_path[old_path.length - 1]
      if (cat !== old_cat) {
        old_path[old_path.length - 1] = delAccentLower(cat)
        let new_path = old_path.join('/')
        this.$router.push(new_path)
      }
    },
    updateCatBtn(val) {
      let cur_id = this.categories.findIndex(cat => cat === this.current_cat)
      let new_id = cur_id + val
      if (new_id >= 0 && new_id < this.categories.length) {
        this.updateCat(this.categories[new_id])
      }
    },
    class_btn(cat) {
      let base = 'white--text font-weight-medium'
      if (cat !== this.current_cat) {
        if (this.$vuetify.breakpoint.width < this.width_switch) {
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
.sticky_navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;
}
</style>
