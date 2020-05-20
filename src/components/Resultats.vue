<template>
  <v-card max-width="700" class="mx-auto my-0 pa-3">
    <h2>Vos émissions annuelles</h2>

    <v-card-text v-if="ges_total === 0" class="d-flex flex-column">
      <h3 class="pb-4">Vous n'avez pas encore renseigné d'émissions.</h3>
      <router-link to="/forms/transports">
        <v-btn color="primary">Commencer</v-btn>
      </router-link>
    </v-card-text>

    <v-card-text v-show="ges_total > 0">
      <h3>
        {{
          `Vos émissions annuelles sont de ${ges_total.toFixed(2)} kg eq. CO2`
        }}
      </h3>
    </v-card-text>
    <resultats-chart
      class="ma-2"
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
