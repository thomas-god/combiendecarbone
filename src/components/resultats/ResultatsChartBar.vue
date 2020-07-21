<script>
import { Bar } from 'vue-chartjs'

const options = {
  maintainAspectRatio: false,
  title: {
    text: "Principaux postes d'émissions",
    display: false
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
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          display: true,
          maxRotation: 0,
          minRotation: 0
        }
      }
    ],
    yAxes: [
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
  extends: Bar,
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
        wordWrap(label, 20)
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
  let res = []
  while (str.length > maxWidth) {
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        res.push(str.slice(0, i))
        str = str.slice(i + 1)
        break
      }
    }
  }
  res.push(str)
  return res
}
function testWhite(x) {
  var white = new RegExp(/^\s$/)
  return white.test(x.charAt(0))
}
</script>

<style></style>
