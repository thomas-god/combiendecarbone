<template>
  <v-container class="pt-0">
    <v-card max-width="700" class="mx-auto mt-0 mb-3 pa-3">
      <h2>Vos émissions annuelles</h2>

      <v-card-text v-if="ges_total === 0" class="d-flex flex-column">
        <h3 class="pb-4">Vous n'avez pas encore renseigné d'émissions.</h3>
        <router-link to="/forms/transports">
          <v-btn color="primary">Commencer</v-btn>
        </router-link>
      </v-card-text>

      <v-card-text max-width="700" v-show="ges_total > 0">
        <h3>
          Vos émissions annuelles sont de
          <strong>{{ ges_total.toFixed(2) }}</strong> kg eq. CO2
        </h3>
      </v-card-text>
    </v-card>

    <v-card max-width="700" class="mx-auto my-3 pa-3" v-show="ges_total > 0">
      <v-card-title>Vos émissions par catégories</v-card-title>
      <chart-doughnut
        class="ma-2 mx-auto chart"
        :input_data="gesByCatTotal"
        v-show="ges_total > 0"
        @category-selected="subplotCallback"
      ></chart-doughnut>
    </v-card>

    <v-card max-width="700" class="mx-auto my-3 pa-3" v-show="ges_total > 0">
      <v-card-title>Vos principaux postes d'émissions</v-card-title>
      <div class="chartAreaWrapper">
        <chart-bar
          :style="{ width: chart_scroll }"
          :input_data="top_ges"
          v-show="ges_total > 0"
          @ecogeste-selected="ecogesteCallback"
        ></chart-bar>
      </div>
    </v-card>

    <v-card
      max-width="700"
      class="mx-auto my-3 pa-3"
      v-show="ges_total > 0 && subplot.display"
    >
      <v-card-title>
        Vos émissions pour la catégorie
        <em>{{ ': ' + subplot.category }}</em>
      </v-card-title>
      <chart-sub-doughnut
        class="ma-2 mx-auto me-10 chart"
        :input_data="subplot.data"
        :category="subplot.category"
      ></chart-sub-doughnut>
    </v-card>

    <ecogeste :name="ecogeste" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ChartDoughnut from './ResultatsChartDoughnut.vue'
import ChartSubDoughnut from './ResultatsChartSubDoughnut.vue'
import ChartBar from './ResultatsChartBar.vue'
import Ecogeste from '@/components/ecogestes/Ecogeste.vue'
import { mapGetters } from 'vuex'
import { ChartData } from 'chart.js'

interface GesItem {
  name: string
  ges: number
}

export default Vue.extend({
  components: {
    ChartDoughnut,
    ChartSubDoughnut,
    ChartBar,
    Ecogeste
  },
  data() {
    return {
      subplot: {
        data: {},
        display: false,
        category: ''
      },
      ecogeste: ''
    }
  },
  computed: {
    ...mapGetters({
      gesByCatTotal: 'ges/gesByCatTotal',
      gesByCat: 'ges/gesByCat',
      ges_total: 'ges/gesTotal',
      top_ges: 'ges/topGesAsChartData'
    }),
    chart_scroll(): string {
      let res = ''
      if (this.top_ges.labels) {
        res = `${110 * this.top_ges.labels.length}px`
      }
      return res
    }
  },
  methods: {
    subplotCallback(cat: string) {
      this.subplot.data = this.gesByCat[cat]
      this.subplot.display = true
      this.subplot.category = cat
    },
    ecogesteCallback(cat: string) {
      this.ecogeste = cat[0]
    }
  }
})

function round(num: number, n: number): number {
  return Math.round((num + Number.EPSILON) * 10 ** n) / 10 ** n
}
</script>

<style>
.chart {
  position: relative;
  height: 100%;
  width: 100%;
}

.chartAreaWrapper {
  width: 100%;
  overflow-x: scroll;
}
</style>
