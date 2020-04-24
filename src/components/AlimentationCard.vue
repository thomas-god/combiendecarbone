<template>
  <v-card class="mx-auto my-3">
    <v-card-title>Votre régime alimentaire</v-card-title>
    <v-card-text class="text-left">
      <p v-for="r in items" :key="r.name">{{ r.text }}: {{ regime[r.name] }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime',
      items: 'alimentation/getItems'
    })
  }
}
</script>

<style></style>
