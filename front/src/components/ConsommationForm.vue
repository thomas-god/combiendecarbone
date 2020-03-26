<template>
  <v-card class="pa-3 ma-0">
    <!-- <v-card-title class="mb-0 pb-0 align-self-center justify-center">
      <p>Vos habitudes de consommation</p>
    </v-card-title> -->
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-card-title class="align-self-start">
          {{ titles[current_cat] }}
        </v-card-title>
        <v-select
          label="Ajouter"
          :items="items[current_cat]"
          item-text="full_name"
          return-object
          @input="e => addVet(current_cat, e)"
        ></v-select>
        <div
          v-for="item in active[current_cat]"
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
            @click="deleteVet(current_cat, item.name)"
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
      rulesMode: [value => !!value || 'Champs requis.'],
      consommation: {},
      active: {
        vet: [],
        elec: [],
        ht: []
      },
      titles: {
        vet: 'Combien de vêtements achetez-vous tous les ans ?',
        elec: 'Combien de temps gardez vous votre électroménager (en années) ?',
        ht: 'Combien de temps gardez vous votre high-tech (en années) ?'
      },
      cur_cat: 1
    }
  },
  computed: {
    ...mapGetters({
      items: 'consommation/getItems'
    }),
    current_cat() {
      const cats = {
        Vêtements: 'vet',
        'High-tech': 'ht',
        Électroménager: 'elec'
      }
      return cats[this.category]
    }
  },
  mounted() {
    let conso = {}
    for (let cat in this.items) {
      this.items[cat].forEach(vet => {
        conso[vet.name] = 0
      })
    }
    this.consommation = conso
    this.$refs.form.resetValidation()
  },
  methods: {
    ...mapActions({
      updateConso: 'consommation/updateConso'
    }),
    addVet(cat, item) {
      let idx = this.active[cat].findIndex(v => v.name === item.name)
      if (idx === -1) {
        this.active[cat].push(item)
      }
    },
    deleteVet(cat, item_name) {
      let idx = this.active[cat].findIndex(v => v.name === item_name)
      if (idx > -1) {
        Vue.delete(this.active[cat], idx)
        this.consommation[item_name] = ''
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateConso(this.consommation)
        this.$emit('close')
      }
    },
    update(e) {
      this.$nextTick(() => {
        console.log('old jeans', this.consommation.jeans)
        Vue.set(this.consommation, 'jeans', e)
        console.log('jeans', this.consommation.jeans)
      })
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
