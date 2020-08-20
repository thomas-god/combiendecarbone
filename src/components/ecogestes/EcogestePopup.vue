<template>
  <v-dialog
    v-model="popup"
    max-width="550px"
    @click:outside="closePopup"
    class="ma-0"
  >
    <v-card>
      <v-card-title class="justify-center">{{ name }}</v-card-title>

      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et suscipit
        autem sed sapiente ducimus officia soluta similique ipsam aperiam.
        Doloribus accusantium eius, commodi ex quo laboriosam expedita sunt
        molestiae pariatur!
      </v-card-text>

      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et suscipit
        autem sed sapiente ducimus officia soluta similique ipsam aperiam.
        Doloribus accusantium eius, commodi ex quo laboriosam expedita sunt
        molestiae pariatur!
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn @click="closePopup" class="mx-a">OK</v-btn>
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
