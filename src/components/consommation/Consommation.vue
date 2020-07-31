<template>
  <category @opening="resetForm">
    <template v-slot:title>
      Vos achats
    </template>
    <template v-slot:text>
      <p>
        Pour estimer l'impact de vos habitudes d'achat renseignez pour les
        vêtements les quantités que vous achetez habituellement dans l'année, et
        pour l'électroménager et le high-tech les durées de vie habituelles de
        vos appareils.
      </p>
    </template>

    <template v-slot:btn="{ open }">
      <v-card-actions
        class="d-flex flex-column align-center flex-sm-row justify-sm-space-around py-0 px-10"
      >
        <v-btn
          v-for="cat in categories"
          :key="`${cat}-form`"
          color="primary"
          dark
          @click="openForm(cat, open)"
          class="ma-3"
        >
          {{ cat }}
        </v-btn>
      </v-card-actions>
    </template>

    <template v-slot:form="{ close }">
      <consommation-form @close="close" :category="current_cat" ref="form" />
    </template>

    <template v-slot:card>
      <consommation-card
        v-for="cat in categories"
        :key="`${cat}-card`"
        :category="cat"
      >
      </consommation-card>
    </template>
  </category>
</template>

<script lang="ts">
import Vue from 'vue'
import Category from '../base/Category.vue'
import ConsommationForm from './ConsommationForm.vue'
import ConsommationCard from './ConsommationCard.vue'

export default Vue.extend({
  components: {
    Category,
    ConsommationForm,
    ConsommationCard
  },
  data() {
    return {
      categories: ['Vêtements', 'High-tech', 'Électroménager'],
      current_cat: 'Vêtements'
    }
  },
  methods: {
    openForm(cat: string, open: () => void) {
      this.current_cat = cat
      open()
    },
    async resetForm() {
      await this.$nextTick()
      let form = this.$refs.form as Vue & { resetForm: () => void }
      form.resetForm()
    }
  }
})
</script>

<style></style>
