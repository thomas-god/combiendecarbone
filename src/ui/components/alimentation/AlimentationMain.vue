<template>
  <category :btnName="btnName">
    <template v-slot:title> Votre alimentation </template>
    <template v-slot:text>
      <p>
        Pour estimer l'impact de vos habitudes alimentaires, répondez à ces
        quelques questions sur votre régime alimentaire habituel (consommation
        de viande, de produits locaux, etc.).
      </p>
    </template>

    <template v-slot:form="{ close }">
      <food-form @close="close" ref="form_alim" :food-module="foodModule"/>
    </template>

    <template v-slot:card>
      <alimentation-card />
    </template>
  </category>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Category from "@/ui/components/base/CategoryInput.vue";
// import AlimentationForm from './AlimentationForm.vue';
import AlimentationCard from "./AlimentationCard.vue";
import FoodForm from "./FoodForm.vue";
import { FoodModule } from "@/domain/modules/FoodModule";
import { NewFoodRegime } from "@/domain/usecases/NewFoodRegime";

export default Vue.extend({
  components: {
    Category,
    // AlimentationForm,
    AlimentationCard,
    FoodForm,
  },
  data() {
    return {
      foodRegime: new NewFoodRegime(),
      foodModule: new FoodModule(),
      foodItems: [
        { value: "redMeat", text: "Viande rouge" },
        { value: "whiteMeat", text: "Viange blanche" },
        { value: "bio", text: "Produits bios" },
        { value: "local", text: "Produits locaux" },
      ],
    };
  },
  computed: {
  //   ...mapGetters({
  //     regime: "alimentation/getRegime",
  //   }),
    isRegimeEmpty(): boolean {
      return this.foodModule.regime.isErr();
    },
    btnName(): string {
      return this.isRegimeEmpty ? "Répondre" : "Modifier";
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
