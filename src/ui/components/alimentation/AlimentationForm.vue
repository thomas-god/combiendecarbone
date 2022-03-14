<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center justify-center">
      <p>Vos habitudes alimentaires</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          v-for="foodItem in foodItems"
          :items="foodFrequencies"
          :label="foodItem.text"
          required
          :error="!!foodRegime.errors[foodItem.value]"
          :error-messages="foodRegime.errors[foodItem.value]"
          :key="foodItem.value"
          v-model="foodRegime[foodItem.value]"
        ></v-select>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { FoodRegimeForm } from "@/domain/usecases/FoodRegimeForm";
import {
  FoodModulePort,
  foodItems,
} from "@/domain/primaryPorts/FoodModulePort";
import { RegimeFrequencies } from "@/domain/models/Food";

export default Vue.extend({
  name: "AlimentationForm",
  data() {
    return {
      foodRegime: new FoodRegimeForm(),
      foodFrequencies: RegimeFrequencies,
      foodItems: foodItems,
    };
  },
  props: {
    foodModule: {
      type: Object as () => FoodModulePort,
      required: true,
    },
  },
  methods: {
    validate(): void {
      if (this.foodRegime.validate()) {
        this.foodModule.updateRegime(this.foodRegime);
        this.$emit("close");
      }
    },
  },
});
</script>

<style>
</style>
