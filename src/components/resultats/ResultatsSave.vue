<template>
  <v-btn @click="saveBlob({ toto: 'tutu' })">Sauvegarder</v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const logement_module = namespace('logement')

@Component
export default class ResultatsSave extends Vue {
  saveBlob(blob: any): void {
    const file = new Blob([JSON.stringify(blob)], { type: 'application/json' })
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    const date = new Date()
    a.href = url
    a.download = `Bilan CO2 - ${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}.json`
    document.body.appendChild(a)
    a.click()
    setTimeout(function() {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
</script>

<style></style>
