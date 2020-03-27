<script>
import { Doughnut } from 'vue-chartjs'
import { mapGetters } from 'vuex'
import colors from 'vuetify/lib/util/colors'

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
}

const data_template = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: []
    }
  ],
  labels: ['Red', 'Yellow', 'Blue']
}

export default {
  extends: Doughnut,
  props: ['input_data'],
  data() {
    return {
      options: options,
      data_chart: {}
    }
  },
  computed: {
    ...mapGetters({
      categories_colors: 'categories/getCategoriesColors'
    })
  },
  mounted() {
    this.updateChart()
  },
  watch: {
    input_data() {
      this.updateChart()
    }
  },
  methods: {
    updateChart() {
      let data_fmt = { ...data_template }
      data_fmt.labels = Object.keys(this.input_data)
      data_fmt.datasets[0].data = []

      data_fmt.labels.forEach(cat => {
        data_fmt.datasets[0].data.push(this.input_data[cat])
        data_fmt.datasets[0].backgroundColor.push(
          colors[this.categories_colors[cat]].base
        )
      })

      this.data_chart = data_fmt
      this.renderChart(this.data_chart, this.options)
    }
  }
}
</script>

<style></style>
