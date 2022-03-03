<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center justify-center">
      <p>Vos habitudes alimentaires</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          v-for="item in foodItems"
          :items="foodFrequencies"
          :label="item.label"
          required
          :error="!!foodRegime.errors[item]"
          :error-messages="foodRegime.errors[item]"
          :key="item.value"
          v-model="foodRegime[item]"
        ></v-select>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
  <!-- <div>
    <form action="food-form" @submit.prevent>
      <label for="food-form-bio">Bio</label>
      <select name="food-form-bio" v-model="newFoodRegime.bio">
        <option
          v-for="option in foodFrequencies"
          :key="`food-form-bio-${option}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <label for="food-form-local">Local</label>
      <select name="food-form-local" v-model="newFoodRegime.local">
        <option
          v-for="option in foodFrequencies"
          :key="`food-form-local-${option}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <label for="food-form-red-meat">Viande rouge</label>
      <select name="food-form-red-meat" v-model="newFoodRegime.redMeat">
        <option
          v-for="option in foodFrequencies"
          :key="`food-form-red-meat-${option}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <label for="food-form-white-meat">Viande blanche</label>
      <select name="food-form-white-meat" v-model="newFoodRegime.whiteMeat">
        <option
          v-for="option in foodFrequencies"
          :key="`food-form-white-meat-${option}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
        <v-btn @click="validate" color="success">Ok</v-btn>
    </form>
  </div> -->
</template>

<script lang="ts">
import Vue from "vue";
import { NewFoodRegime } from "@/domain/usecases/NewFoodRegime";
import { FoodModulePort } from "@/domain/primaryPorts/FoodModulePort";
import { RegimeFrequencies } from "@/domain/models/Food";

export default Vue.extend({
  name: "FoodForm",
  data() {
    return {
      foodRegime: new NewFoodRegime(),
      foodFrequencies: RegimeFrequencies,
      foodItems: [
        { value: "redMeat", text: "Viande rouge" },
        { value: "whiteMeat", text: "Viange blanche" },
        { value: "bio", text: "Produits bios" },
        { value: "local", text: "Produits locaux" },
      ],
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
