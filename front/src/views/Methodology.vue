<template>
  <v-card max-width="650px" :class="class_card">
    <router-view />
  </v-card>
</template>

<script>
export default {
  computed: {
    class_card() {
      return `mx-auto text-justify my-${
        this.$vuetify.breakpoint.xsOnly ? 3 : 10
      } pa-3`
    }
  }
}
</script>
