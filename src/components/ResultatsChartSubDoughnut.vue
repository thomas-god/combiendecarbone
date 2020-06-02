<script>
import { Doughnut } from 'vue-chartjs'
import { mapGetters } from 'vuex'
import colors from 'vuetify/lib/util/colors'

const options = {
  maintainAspectRatio: false,
  title: {
    text: 'Émissions de la catégorie XXX',
    display: false
  },
  legend: {
    position: 'bottom'
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
  props: ['input_data', 'category'],
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
      if (this.category) {
        let cat_colors = shuffle(
          Object.values(colors[this.categories_colors[this.category]])
        )
        let data_fmt = { ...data_template }
        data_fmt.labels = Object.keys(this.input_data)
        data_fmt.datasets[0].data = []
        data_fmt.datasets[0].backgroundColor = []

        data_fmt.labels.forEach((cat, id) => {
          data_fmt.datasets[0].data.push(round(this.input_data[cat], 2))
          data_fmt.datasets[0].backgroundColor.push(cat_colors[id])
        })
        this.data_chart = data_fmt

        this.options.title.text = `Émissions de : ${this.category}`

        this.renderChart(this.data_chart, this.options)
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
function shuffle(array) {
  let m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}
</script>

<style></style>
