<script>
import { HorizontalBar } from 'vue-chartjs'

const options = {
  maintainAspectRatio: false,
  title: {
    text: "Principaux postes d'émissions",
    display: true
  },
  legend: {
    display: false
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
          beginAtZero: true,
          display: true
          /* maxRotation: 38,
          minRotation: 38 */
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: true
        },
        ticks: {
          display: true,
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'GES (kg eq. CO2)'
        }
      }
    ]
  }
}

/* const data_template = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: []
    }
  ],
  labels: ['Red', 'Yellow', 'Blue']
} */

export default {
  extends: HorizontalBar,
  props: ['input_data'],
  data() {
    return {
      options: options,
      data_chart: {}
    }
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
      this.data_chart = this.input_data
      this.data_chart.labels = this.data_chart.labels.map(label =>
        wordWrap(label, 30)
      )
      this.renderChart(this.input_data, this.options)
    }
  }
}
function drawLabel(tooltipItem, data) {
  var label = data.labels[tooltipItem.index] || ''

  if (label) {
    label += ': '
  }
  let val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
  label += val
  label += ' kg eq.CO2'
  return label
}

function wordWrap(str, maxWidth) {
  let newLineStr = '\n'
  let res = ''
  while (str.length > maxWidth) {
    let found = false
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        res = res + [str.slice(0, i), newLineStr].join('')
        str = str.slice(i + 1)
        found = true
        break
      }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
      res += [str.slice(0, maxWidth), newLineStr].join('')
      str = str.slice(maxWidth)
    }
  }

  return res + str
}
function testWhite(x) {
  var white = new RegExp(/^\s$/)
  return white.test(x.charAt(0))
}
</script>

<style></style>
