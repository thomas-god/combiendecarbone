<template>
  <ecogeste-popup v-model="popup">
    <template v-slot:title>
      Les émissions dues à votre consommation 🏡
    </template>

    <template v-slot:text>
      <v-card-text class="text-body-1 text-left">
        Afin de réduire les émissions dues à vos achats il est important d'être
        conscient·e de 2 aspects : réduire la quantité de gaz à effet de serre
        émise lors de la fabrication d'un objet en achetant des produits dont
        les
        <span class="font-weight-bold"
          >procédés de fabrication sont respectueux de l'environnement</span
        >, et en évitant la fabrication de nouveaux produits en gardant vos
        appareils le
        <span class="font-weight-bold">
          plus longtemps possible et en leur offrant si possible une seconde vie </span
        >.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Renseignez vous sur les labels avant d'acheter un nouveau produit,
        sur sa consommation énergétique, sur la disponibilité des pièces
        détachées, etc.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 En cas de panne de nombreuses ressources sont maintenant disponibles
        pour réparer vous même vos appareils. Par exemple
        <a target="_blank" href="https://fr.ifixit.com/"></a> pour vos
        téléphones et appareils électroniques.
      </v-card-text>

      <v-card-text class="text-body-1 text-left">
        🍃 Enfin si vous ne pouvez pas réparer vous même vos appareils vous
        pouvez les apporter dans une recyclerie qui aura peut être les
        compétences pour le réparer et lui donner une seconde vie, on bien saura
        faire usage de ses pièces détachées.
      </v-card-text>
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

<style scoped>
li {
  font-size: 1rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  text-align: start !important;
}
</style>
