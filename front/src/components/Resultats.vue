<template>
  <div class="chart">
    <resultats-chart class="ma-10" :input_data="ges"></resultats-chart>
  </div>
</template>

<script>
import ResultatsChart from './ResultatsChart.vue'
import { mapGetters } from 'vuex'
const data = {
  Transports: 10,
  Logement: 20,
  Alimentation: 15,
  Consommation: 7
}
export default {
  components: {
    ResultatsChart
  },
  data() {
    return {
      data: data
    }
  },
  computed: {
    ...mapGetters({
      ges: 'ges/getTotalGes'
    })
  }
}
</script>

<style>
.chart {
  width: 75%;
  margin: auto;
}
</style>
