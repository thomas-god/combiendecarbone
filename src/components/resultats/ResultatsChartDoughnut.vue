<script>
import { Doughnut } from 'vue-chartjs'
import { mapGetters } from 'vuex'
import colors from 'vuetify/lib/util/colors'

const options = {
  maintainAspectRatio: false,
  title: {
    text: 'Émissions totales',
    display: false
  },
  legend: {
    position: 'top',
    labels: {
      fontSize: 14
    }
  },
  tooltips: {
    callbacks: {
      label: drawLabel
    }
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          display: false
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

function round(num, n) {
  return Math.round((num + Number.EPSILON) * 10 ** n) / 10 ** n
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
    this.options.onClick = this.clickCallback
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
        data_fmt.datasets[0].data.push(round(this.input_data[cat], 2))
        data_fmt.datasets[0].backgroundColor.push(
          colors[this.categories_colors[cat]].base
        )
      })

      this.data_chart = data_fmt
      if (data_fmt.datasets[0].data.reduce((sum, i) => sum + i) > 0)
        this.renderChart(this.data_chart, this.options)
    },
    clickCallback(evt) {
      if (this.$data._chart.getElementsAtEvent(evt)[0]) {
        this.$emit(
          'category-selected',
          this.$data._chart.getElementsAtEvent(evt)[0]._model.label
        )
      }
    }
  }
}
function drawLabel(tooltipItem, data) {
  var label = data.labels[tooltipItem.index] || ''

  if (label) {
    label += ': '
  }
  let val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
  let tot = data.datasets[tooltipItem.datasetIndex].data.reduce((a, b) => a + b)
  label += val
  label += ' kg eq.CO2 ('
  label += ((val / tot) * 100).toFixed(2)
  label += ' %)'
  return label
}
</script>

<style></style>
