<template>
  <resultats-chart
    :height="'50%'"
    :width="'50%'"
    class="ma-10"
    :input_data="data"
  ></resultats-chart>
</template>

<script>
import ResultatsChart from './ResultatsChart.vue'
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
  }
}
</script>

<style></style>
