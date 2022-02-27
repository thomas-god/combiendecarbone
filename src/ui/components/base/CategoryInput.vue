<template>
  <v-card class="mx-auto my-0 pa-3 pb-6" max-width="700px">
    <h2 class="pt-1">
      <slot name="title">
        Titre par défaut
      </slot>
    </h2>

    <v-card-text class="text-justify" color="black">
      <slot name="text">
        <p>
          Texte par défaut.
        </p>
      </slot>
    </v-card-text>

    <slot name="btn" :open="openForm">
      <v-btn color="primary" dark @click="openForm">
        {{ btnName }}
      </v-btn>
    </slot>

    <v-dialog
      v-model="form"
      max-width="550px"
      @click:outside="closeForm"
      class="ma-0"
      :scrollable="scrollable"
    >
      <slot name="form" :close="closeForm">
        <v-form></v-form>
      </slot>
    </v-dialog>
    <slot name="card" :open="openForm"> </slot>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    btnName: {
      type: String,
      default: 'Répondre',
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: false,
      form_touched: false,
    };
  },
  methods: {
    openForm(): void {
      this.form = true;
      this.$emit('opening');
    },
    closeForm(): void {
      this.form = false;
      this.$emit('closing');
    },
  },
});
</script>

<style></style>
