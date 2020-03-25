<template>
  <def-cat>
    <template v-slot:text>
      <h1>Toto</h1>
    </template>

    <template v-slot:form="{ close }">
      <v-card>
        <v-form>
          <v-select
            :items="['Oui', 'Non']"
            label="Je connais mes factures d'énergie"
            required
          ></v-select>
          <v-btn @click="close">OK</v-btn>
        </v-form>
      </v-card>
    </template>
  </def-cat>
</template>

<script>
import defCat from './Category.vue'
export default {
  components: { defCat }
}
</script>

<style></style>
