<template>
  <category :btnName="btnName" @opening="resetForm">
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
      <alimentation-form @close="close" ref="form_alim" />
    </template>

    <template v-slot:card>
      <alimentation-card />
    </template>
  </category>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Category from '@/ui/components/base/CategoryInput.vue';
import AlimentationForm from './AlimentationForm.vue';
import AlimentationCard from './AlimentationCard.vue';

export default Vue.extend({
  components: {
    Category,
    AlimentationForm,
    AlimentationCard,
  },
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime',
    }),
    isRegime() {
      return !Object.values(this.regime).some((item) => item === '');
    },
    btnName() {
      return this.isRegime ? 'Modifier' : 'Répondre';
    },
  },
  methods: {
    async resetForm() {
      await this.$nextTick();
      const form = this.$refs.form_alim as Vue & { resetRegime: () => void };
      form.resetRegime();
    },
  },
});
</script>

<style></style>
