<template>
  <v-card class="mx-auto my-3">
    <v-card-title>Votre consommation</v-card-title>
    <v-card-text class="text-left">
      <p v-for="r in regime_items" :key="r.name">
        {{ r.text }}: {{ regime[r.name] }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime',
      regime_items: 'alimentation/getRegimeItems'
    })
  }
}
</script>

<style></style>
