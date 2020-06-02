<template>
  <category :btnName="btn_names">
    <template v-slot:title>
      Votre alimentation
    </template>
    <template v-slot:text>
      <p>
        L'impact de l'alimentation dépendant en premier lieu du régime
        alimentaire (plus ou moins carné, produits locaux et de saison, etc.),
        répondez à ces quelques questions pour que nous puissions connaître le
        vôtre.
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
import Category from './base/Category.vue'
import AlimentationForm from './AlimentationForm.vue'
import AlimentationCard from './AlimentationCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Category,
    AlimentationForm,
    AlimentationCard
  },
  data() {
    return {
      btn_names: {
        clean: 'Répondre',
        dirty: 'Modifier'
      }
    }
  },
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime'
    }),
    isRegime() {
      return !(Object.keys(this.regime).length === 0)
    }
  }
}
</script>

<style></style>
