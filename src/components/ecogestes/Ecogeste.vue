<template>
  <v-dialog
    v-model="popup"
    max-width="550px"
    @click:outside="closePopup"
    class="ma-0"
  >
    <v-card>
      <v-card-title>{{ name }}</v-card-title>

      <v-card-actions>
        <v-btn @click="closePopup">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      default: 'Votre écogeste'
    }
  },
  data() {
    return {
      popup: false
    }
  },
  watch: {
    name() {
      this.openPopup()
    }
  },
  methods: {
    openPopup(): void {
      this.popup = true
      this.$emit('opening')
    },
    closePopup(): void {
      this.popup = false
      this.$emit('closing')
    }
  }
})
</script>
