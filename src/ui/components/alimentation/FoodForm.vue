<template>
  <div>
    <form action="food-form" @submit.prevent>
      <select name="food-form-bio" v-model="newFoodRegime.bio">
        <option
          v-for="option in foodFrequencies"
          :key="`food-form-bio-${option}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </form>
  </div>
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
      newFoodRegime: new NewFoodRegime(),
      foodFrequencies: RegimeFrequencies,
    };
  },
  props: {
    foodModule: {
      type: Object as () => FoodModulePort,
      required: true,
    },
  },
});
</script>

<style>
</style>
