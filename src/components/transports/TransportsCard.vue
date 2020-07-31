<template>
  <v-card max-width="550px" class="mx-auto my-3">
    <v-card-title class="flex-row flex-nowrap align-start">
      <v-icon large class="mr-2 mt-1" color="success">{{ icon_mode }}</v-icon>
      <span class="text-left text-nowrap">
        {{ travel.departure.name }}
        <v-icon class="mx-1">{{ icon_ar }}</v-icon>
        {{ travel.arrival.name }}
      </span>
    </v-card-title>
    <v-card-text>
      {{ travel.distance.toFixed(0) }}km - {{ travel.ges.toFixed(0) }} kg eq.
      CO2 {{ travel.type }}
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="warning" outlined rounded @click="update(travel.id)">
        Modifier
      </v-btn>
      <v-btn @click="deleteTravel(travel.id)" color="error" outlined rounded>
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { mdiSwapHorizontalBold, mdiArrowRightBold } from '@mdi/js'

export default Vue.extend({
  props: ['travel'],
  methods: {
    ...mapActions('transports', ['deleteTravel', 'updateCurrentId']),
    update(id: number): void {
      this.updateCurrentId(id)
      this.$emit('update-travel', id)
    }
  },
  computed: {
    ...mapGetters({ getIconByMode: 'transports/getIconByMode' }),
    icon_mode(): string {
      return this.getIconByMode(this.travel.mode)
    },
    icon_ar(): string {
      return this.travel.ar ? mdiSwapHorizontalBold : mdiArrowRightBold
    }
  }
})
</script>

<style>
.v-card__text *,
.v-card__title * {
  word-break: normal; /* maybe !important  */
}
</style>
