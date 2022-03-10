<template>
  <v-card class="mx-auto my-3" v-show="isRegime">
    <v-card-title>Votre régime alimentaire</v-card-title>
    <v-card-text class="text-left" v-if="isRegime">
      <p v-for="foodItem in foodItems" :key="foodItem.value">
        {{ foodItem.text }}: {{ regime.value.props[foodItem.value] }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { FoodRegime } from "@/domain/models/Food";
import {
  FoodModuleErrors,
  FoodModulePort,
} from "@/domain/primaryPorts/FoodModulePort";
import { Result } from "neverthrow";
import Vue from "vue";

export default Vue.extend({
  props: {
    foodModule: {
      type: Object as () => FoodModulePort,
      required: true,
    },
    foodItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    regime(): Result<FoodRegime, FoodModuleErrors> {
      return this.foodModule.regime;
    },
    isRegime(): boolean {
      return this.foodModule.regime.isOk();
    },
  },
});
</script>

<style></style>
