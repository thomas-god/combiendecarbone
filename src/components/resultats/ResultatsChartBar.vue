<script lang="ts">
/* Using Class based component since we have trouble working with
vue-chartjs and TS (complaining about renderChart not being
declared). */
import Vue, { PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { GESItem } from '@/store/modules/ges'

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
      type: Array as PropType<GESItem[]>
    }
  }
})

@Component({
  extends: Bar
})
export default class MyComponent extends chartProps {
  options: ChartOptions = options
  data_chart: ChartData = {}
  labels_ges_correspondance: Record<string, GESItem> = {}

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
    this.data_chart = {
      datasets: [
        {
          barThickness: 30,
          data: this.input_data.map((e: GESItem) => round(e.value, 2)),
          backgroundColor: this.input_data.map(() => '#607D8B')
        }
      ],
      labels: this.input_data.map((e: GESItem) => e.label)
    }
    if (this.data_chart.labels) {
      this.data_chart.labels = this.data_chart.labels.map((label, idx) => {
        const new_label = wordWrap(label as string, 20)
        this.labels_ges_correspondance[new_label.join(' ')] = this.input_data[
          idx
        ]
        return new_label
      })
    }
    this.renderChart(this.data_chart, this.options)
  }

  clickCallback(evt: any): void {
    if (this.$data._chart.getElementsAtEvent(evt)[0]) {
      const label = this.$data._chart.getElementsAtEvent(evt)[0]._model.label
      const ges_item = this.labels_ges_correspondance[label.join(' ')]
      this.$emit('ecogeste-selected', ges_item)
    }
  }
}

function round(num: number, n: number): number {
  return Math.round((num + Number.EPSILON) * 10 ** n) / 10 ** n
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
  const res = []
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
  const white = new RegExp(/^\s$/)
  return white.test(x.charAt(0))
}
</script>

<style></style>
