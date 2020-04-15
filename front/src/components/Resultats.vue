<template>
  <v-card max-width="650px" class="mx-auto my-0 pa-3">
    <v-card-title v-if="ges_total === 0" class="d-flex flex-column">
      <p>Vous n'avez pas encore renseigné d'émissions.</p>

      <v-btn color="primary" @click="$emit('go-start')">Commencer</v-btn>
    </v-card-title>

    <v-card-title v-show="ges_total > 0">
      {{ `Vos émissions annuelles sont de ${ges_total.toFixed(2)} kg eq. CO2` }}
    </v-card-title>
    <resultats-chart
      class="ma-10"
      :input_data="ges"
      v-show="ges_total > 0"
    ></resultats-chart>
  </v-card>
</template>

<script>
import ResultatsChart from './ResultatsChart.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ResultatsChart
  },
  computed: {
    ...mapGetters({
      ges: 'ges/getTotalGes'
    }),
    ges_total() {
      let ges = 0
      for (let cat in this.ges) {
        ges += this.ges[cat]
      }
      return ges
    }
  }
}
</script>

<style>
.chart {
  width: 75%;
  margin: auto;
}
</style>
