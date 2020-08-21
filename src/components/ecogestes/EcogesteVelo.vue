<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Vélo
    </template>

    <template v-slot:text>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam deleniti
        necessitatibus tempore autem id repellendus minus voluptatibus, odit
        culpa quibusdam a tenetur natus tempora dolor vitae cupiditate expedita
        officia optio.
      </v-card-text>
    </template>

    <template v-slot:links>
      <ul>
        <li>Lien vélo 1</li>
        <li>Lien vélo 2</li>
      </ul>
    </template>
  </ecogeste-popup>
</template>

<script lang="ts">
import Vue from 'vue'
import EcogesteBase from './EcogesteBase.vue'

export default Vue.extend({
  extends: EcogesteBase
})
</script>

<style></style>
