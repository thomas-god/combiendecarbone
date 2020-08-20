<script lang="ts">
/* Using Class based component since we have trouble working with
vue-chartjs and TS (complaining about renderChart not being
declared). */
import Vue, { PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

const options: ChartOptions = {
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

const chartProps = Vue.extend({
  props: {
    input_data: {
      type: Object as PropType<ChartData>
    }
  }
})

@Component({
  extends: Bar
})
export default class MyComponent extends chartProps {
  options: ChartOptions = options
  data_chart: ChartData = {}

  @Watch('input_data')
  onInputDataChange(): void {
    this.updateChart()
  }

  mounted(): void {
    this.options.onClick = this.clickCallback
    this.updateChart()
  }

  public renderChart!: (chartData: ChartData, options: ChartOptions) => void
  updateChart(): void {
    this.data_chart = this.input_data
    if (this.data_chart.labels) {
      this.data_chart.labels = this.data_chart.labels.map(label =>
        wordWrap(label as string, 20)
      )
    }
    this.renderChart(this.input_data, this.options)
  }

  clickCallback(evt: any): void {
    if (this.$data._chart.getElementsAtEvent(evt)[0]) {
      this.$emit(
        'ecogeste-selected',
        this.$data._chart.getElementsAtEvent(evt)[0]._model.label[0].join(' ')
      )
    }
  }
}

function drawLabel(tooltipItem: ChartTooltipItem, data: ChartData): string {
  let label = ''
  if (
    data.labels != null &&
    tooltipItem.index != null &&
    tooltipItem.index < data.labels.length
  ) {
    label = data.labels[tooltipItem.index] + ': '
    if (
      data.datasets != null &&
      tooltipItem.datasetIndex != null &&
      data.datasets[tooltipItem.datasetIndex] != null &&
      data.datasets[tooltipItem.datasetIndex].data != null &&
      tooltipItem.index != null
    ) {
      label += (data.datasets[tooltipItem.datasetIndex].data as number[])[
        tooltipItem.index
      ]
      label += ' kg eq.CO2'
    }
  }

  return label
}

function wordWrap(str: string, maxWidth: number) {
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

function testWhite(x: string) {
  var white = new RegExp(/^\s$/)
  return white.test(x.charAt(0))
}
</script>

<style></style>
