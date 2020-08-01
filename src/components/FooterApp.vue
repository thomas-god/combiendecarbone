<template>
  <v-footer :padless="true" :absolute="true" app>
    <v-card flat tile width="100%" color="#eceff1">
      <v-divider width="90%" style="margin: auto" />
      <v-card-text class="py-2">
        <v-btn
          icon
          v-for="icon in icons"
          :key="icon.name"
          :href="icon.link"
          class="mx-1"
          target="_blank"
        >
          <v-icon>{{ icon.mdiName }}</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

interface Icon {
  name: string
  mdiName: string
  link: string
}

export default Vue.extend({
  data() {
    return {
      icons: [
        {
          name: 'Github',
          mdiName: 'mdi-github',
          link: 'https://github.com/thomas-god/ges'
        },
        { name: 'Twitter', mdiName: 'mdi-twitter', link: '' },
        {
          name: 'Mail',
          mdiName: 'mdi-email',
          link: 'mailto:contact@combiendecarbone.fr'
        }
      ] as Icon[]
    }
  }
})
</script>
