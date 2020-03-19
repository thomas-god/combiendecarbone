<template>
  <v-card>
    <v-card-title>{{ travel.mode }}</v-card-title>
    <v-card-text>{{ travel.distance }}km</v-card-text>
    <v-card-actions>
      <v-btn @click="deleteTravel(travel.id)">X</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['travel'],
  methods: mapActions('transports', ['deleteTravel'])
}
</script>

<style></style>
