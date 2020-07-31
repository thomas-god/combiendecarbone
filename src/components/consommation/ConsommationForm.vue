<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="align-self-start">
      {{ titles[category] }}
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form" class="d-flex flex-column align-center">
        <v-menu :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" class="mb-3">
              Choisir
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in remaining_items_sorted"
              :key="item.name"
              @click="addActiveItem(item)"
            >
              <v-list-item-title>
                {{ item.full_name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div
          v-for="item in active_items"
          :key="item.name"
          class="d-flex flex-row align-center justify-center mx-auto"
        >
          <num-btn
            v-model="item.value"
            :label="$vuetify.breakpoint.xsOnly ? item.full_name : ''"
            :prefix="!$vuetify.breakpoint.xsOnly ? item.full_name + ': ' : ''"
            :min="0"
            class="my-4"
            max-width="380px"
          />
          <v-btn
            @click="deleteActiveItem(item)"
            fab
            x-small
            outlined
            color="warning"
            class="ml-3"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </div>

        <v-btn
          @click="validate"
          color="success"
          class="ma-3"
          v-show="active_items.length > 0"
          >Ok</v-btn
        >
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseNumPM from '../base/BaseNumPM.vue'
import { mapGetters, mapActions } from 'vuex'
import { ConsommationItem } from '@/plugins/consommation_ges'

export default Vue.extend({
  components: {
    numBtn: BaseNumPM
  },
  props: ['category'],
  data() {
    return {
      items: [] as ConsommationItem[],
      consommation: [] as ConsommationItem[],
      active_items: [] as ConsommationItem[],
      remaining_items: [] as ConsommationItem[],
      titles: {
        Vêtements: 'Combien de vêtements achetez-vous tous les ans ?',
        Électroménager: "Combien d'années gardez-vous votre électroménager ?",
        'High-tech': "Combien d'années gardez-vous votre high-tech ?"
      } as Record<string, string>
    }
  },
  computed: {
    ...mapGetters({
      getConso: 'consommation/getConsoByCategory'
    }),
    remaining_items_sorted(): ConsommationItem[] {
      return this.remaining_items
        .concat()
        .sort((a: ConsommationItem, b: ConsommationItem) =>
          a.name > b.name ? 1 : -1
        )
    }
  },
  mounted() {
    this.resetForm()
  },
  watch: {
    category() {
      this.resetForm()
    }
  },
  methods: {
    ...mapActions({
      updateConso: 'consommation/updateConso'
    }),
    resetForm() {
      // Get list of items for current category
      this.consommation = JSON.parse(
        JSON.stringify(this.getConso(this.category))
      )

      // Deduce the list of active items
      this.active_items = []
      this.remaining_items = []
      this.consommation.forEach(item => {
        if (item.value > 0) {
          this.active_items.push(item)
        } else {
          this.remaining_items.push(item)
        }
      })

      /* let form = this.$refs.form as Vue & { resetValidation: () => void }
      form.resetValidation() */
    },
    addActiveItem(item) {
      addToArray(this.active_items, item)
      removeFromArray(this.remaining_items, item)
    },
    deleteActiveItem(item) {
      addToArray(this.remaining_items, item)
      removeFromArray(this.active_items, item)
      let item_found = this.consommation.find(i => i.name === item.name)
      if (item_found) {
        item_found.value = 0
      }
    },
    validate() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.updateConso({ category: this.category, update: this.consommation })
        this.$emit('close')
      }
    }
  }
})

function addToArray(arr, item) {
  let idx = arr.findIndex(v => v.name === item.name)
  if (idx === -1) {
    arr.push(item)
  }
}

function removeFromArray(arr, item) {
  let idx = arr.findIndex(v => v.name === item.name)
  if (idx > -1) {
    Vue.delete(arr, idx)
  }
}
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
