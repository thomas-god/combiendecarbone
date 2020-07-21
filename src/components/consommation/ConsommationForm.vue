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
            v-model="consommation[item.name]"
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

<script>
import Vue from 'vue'
import BaseNumPM from '../base/BaseNumPM.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    numBtn: BaseNumPM
  },
  props: ['category'],
  data() {
    return {
      items: [],
      consommation: {},
      active_items: [],
      remaining_items: [],
      titles: {
        Vêtements: 'Combien de vêtements achetez-vous tous les ans ?',
        Électroménager: "Combien d'années gardez-vous votre électroménager ?",
        'High-tech': "Combien d'années gardez-vous votre high-tech ?"
      }
    }
  },
  computed: {
    ...mapGetters({
      getItems: 'consommation/getItemsByCategory',
      getConso: 'consommation/getConsoByCategory'
    }),
    remaining_items_sorted() {
      return this.remaining_items.concat().sort((a, b) => a.name > b.name)
    }
  },
  mounted() {
    this.updateCycle()
  },
  watch: {
    category() {
      this.updateCycle()
    }
  },
  methods: {
    ...mapActions({
      updateConso: 'consommation/updateConso'
    }),
    updateCycle() {
      // Get list of items for current category
      this.items = this.getItems(this.category)

      // Get conso object for current category
      let conso = this.getConso(this.category)
      if (Object.keys(conso).length === 0) {
        this.items.forEach(item => {
          conso[item.name] = 0
        })
      }
      this.consommation = conso

      // Deduce the list of active items
      this.active_items = []
      this.remaining_items = []
      this.items.forEach(item => {
        if (this.consommation[item.name] > 0) {
          this.active_items.push(item)
        } else {
          this.remaining_items.push(item)
        }
      })
      this.$refs.form.resetValidation()
    },
    addActiveItem(item) {
      addToArray(this.active_items, item)
      removeFromArray(this.remaining_items, item)
    },
    deleteActiveItem(item) {
      addToArray(this.remaining_items, item)
      removeFromArray(this.active_items, item)
      this.consommation[item.name] = 0
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateConso({ category: this.category, update: this.consommation })
        this.$emit('close')
      }
    }
  }
}

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
