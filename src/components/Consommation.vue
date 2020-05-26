<template>
  <category>
    <template v-slot:title>
      Vos achats
    </template>
    <template v-slot:text>
      <p>
        Enfin, nous émettons de manière indirecte lorsque que nous achetons
        vêtements, électro-ménager, appareils high-tech. Renseigner vos
        habitudes de consommation : nombre de vêtements que vous achetez en un
        an et durée de vie de vos appareils.
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
      <consommation-form @close="close" :category="current_cat" />
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

<script>
import Category from './base/Category.vue'
import ConsommationForm from './ConsommationForm.vue'
import ConsommationCard from './ConsommationCard.vue'

export default {
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
    openForm(cat, open) {
      this.current_cat = cat
      open()
    }
  }
}
</script>

<style></style>
