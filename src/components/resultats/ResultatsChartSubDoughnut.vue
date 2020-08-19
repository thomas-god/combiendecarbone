<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Doughnut } from 'vue-chartjs'
import { ChartData, ChartOptions, ChartTooltipItem } from 'chart.js'
import colors, { Colors, Color } from 'vuetify/lib/util/colors'

const options: ChartOptions = {
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
      backgroundColor: [] as string[]
    }
  ],
  labels: ['Red', 'Yellow', 'Blue']
}

const chartProps = Vue.extend({
  props: {
    input_data: {
      type: Object as PropType<Record<string, number>>
    },
    category: {
      type: String,
      required: true
    }
  }
})

@Component({
  extends: Doughnut,
  computed: {
    ...mapGetters({
      categories_colors: 'categories/getCategoriesColors'
    })
  }
})
export default class MyComponent extends chartProps {
  options: ChartOptions = options
  data_chart: ChartData = {}

  categories_colors!: Record<string, string>
  mounted(): void {
    this.options.onClick = this.clickCallback
    this.updateChart()
  }
  @Watch('input_data')
  onInputDataChange(): void {
    this.updateChart()
  }
  renderChart!: (chartData: ChartData, options: ChartOptions) => void

  updateChart(): void {
    if (this.category) {
      let cat_colors = shuffle(
        Object.values(
          colors[this.categories_colors[this.category] as keyof Colors]
        ) as string[]
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

      if (this.options.title) {
        this.options.title.text = `Émissions de : ${this.category}`
      }

      this.renderChart(this.data_chart, this.options)
    }
  }

  clickCallback(evt: any): void {
    if (this.$data._chart.getElementsAtEvent(evt)[0]) {
      this.$emit(
        'ecogeste-selected',
        this.$data._chart.getElementsAtEvent(evt)[0]._model.label
      )
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
      let val = (data.datasets[tooltipItem.datasetIndex].data as number[])[
        tooltipItem.index
      ]
      let tot = (data.datasets[tooltipItem.datasetIndex]
        .data as number[]).reduce((a, b) => a + b)
      label += val.toFixed(2)
      label += ' kg eq.CO2 ('
      label += ((val / tot) * 100).toFixed(2)
      label += ' %)'
    }
  }

  return label
}

function shuffle<T>(array: T[]): T[] {
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
