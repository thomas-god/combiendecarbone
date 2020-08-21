<template>
  <v-dialog v-model="popup" max-width="550px" class="ma-0">
    <v-card>
      <v-card-title class="justify-center"><slot name="title"/></v-card-title>
      <slot name="text" />

      <v-card-title>Pour aller plus loin</v-card-title>
      <v-card-text>
        <slot name="links" />
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn @click="closePopup" class="mx-auto">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopup(): void {
      this.$emit('input', false)
    }
  },
  computed: {
    popup: {
      get: function(): boolean {
        return this.value
      },
      set: function(new_value: boolean) {
        this.$emit('input', new_value)
      }
    }
  }
})
</script>
