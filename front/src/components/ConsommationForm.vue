<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="align-self-start">
      {{ titles[category] }}
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          label="Ajouter"
          :items="items"
          item-text="full_name"
          item-value="name"
          return-object
          @input="addActiveItem"
        ></v-select>
        <div
          v-for="item in active_items"
          :key="item.name"
          class="d-flex flex-row align-center justify-center mx-auto"
        >
          <num-btn
            v-model="consommation[item.name]"
            :prefix="item.full_name + ': '"
            :min="0"
            :max="10"
            class="my-4"
          />
          <v-btn
            @click="deleteActiveItem(item.name)"
            fab
            x-small
            outlined
            color="warning"
            class="ml-3"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </div>

        <v-btn @click="validate" color="success" class="ma-3">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue'
import BaseNumPM from './base/BaseNumPM.vue'
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
      titles: {
        Vêtements: 'Combien de vêtements achetez-vous tous les ans ?',
        Électroménager:
          'Combien de temps gardez vous votre électroménager (en années) ?',
        'High-tech':
          'Combien de temps gardez vous votre high-tech (en années) ?'
      }
    }
  },
  computed: {
    ...mapGetters({
      getItems: 'consommation/getItemsByCategory',
      getConso: 'consommation/getConsoByCategory'
    })
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
      this.items.forEach(item => {
        if (this.consommation[item.name] > 0) {
          this.active_items.push(item)
        }
      })
      this.$refs.form.resetValidation()
    },
    addActiveItem(item) {
      let idx = this.active_items.findIndex(v => v.name === item.name)
      if (idx === -1) {
        this.active_items.push(item)
      }
    },
    deleteActiveItem(item_name) {
      let idx = this.active_items.findIndex(v => v.name === item_name)
      if (idx > -1) {
        Vue.delete(this.active_items, idx)
        this.consommation[item_name] = ''
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateConso({ category: this.category, update: this.consommation })
        this.$emit('close')
      }
    }
  }
}
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
