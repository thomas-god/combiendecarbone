<template>
  <category :btnName="btnName">
    <template v-slot:title>
      Votre alimentation
    </template>
    <template v-slot:text>
      <p>
        Pour estimer l'impact de vos habitudes alimentaires, répondez à ces
        quelques questions sur votre régime alimentaire habituel (consommation
        de viande, de produits locaux, etc.).
      </p>
    </template>

    <template v-slot:form="{ close }">
      <alimentation-form @close="close" />
    </template>

    <template v-slot:card>
      <alimentation-card v-show="isRegime" />
    </template>
  </category>
</template>

<script>
import Category from '../base/Category.vue'
import AlimentationForm from './AlimentationForm.vue'
import AlimentationCard from './AlimentationCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Category,
    AlimentationForm,
    AlimentationCard
  },
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime'
    }),
    isRegime() {
      return !(Object.keys(this.regime).length === 0)
    },
    btnName() {
      return this.isRegime ? 'Modifier' : 'Répondre'
    }
  }
}
</script>

<style></style>
