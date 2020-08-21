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

    <!-- Main doughnut chart -->
    <v-slide-x-transition :hide-on-leave="true">
      <v-card
        max-width="700"
        class="mx-auto my-3 pa-3"
        v-show="ges_total > 0 && show_main_chart"
      >
        <v-card-title>Vos émissions par catégories</v-card-title>
        <v-card-subtitle class="text-left">
          Cliquez sur une catégorie pour obtenir plus de détails !
        </v-card-subtitle>
        <chart-doughnut
          class="ma-2 mx-auto chart"
          :input_data="gesByCatTotal"
          v-show="ges_total > 0"
          @category-selected="subplotCallback"
        ></chart-doughnut>
      </v-card>
    </v-slide-x-transition>

    <!-- Subplot doughnut chart (per category) -->
    <v-slide-x-transition :hide-on-leave="true">
      <v-card
        max-width="700"
        class="mx-auto my-3 pa-3"
        v-show="ges_total > 0 && subplot.display"
      >
        <v-btn
          fab
          icon
          left
          bottom
          absolute
          class="mb-10"
          @click="closeSubplotCallback"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <v-card-title
          v-html="'Vos émissions pour la catégorie: ' + subplot.category"
        >
        </v-card-title>
        <v-card-subtitle class="text-left">
          Cliquez sur un élément pour obtenir une liste d'écogestes
        </v-card-subtitle>
        <chart-sub-doughnut
          class="ma-2 mx-auto me-10 chart"
          :input_data="subplot.data"
          :category="subplot.category"
          @ecogeste-selected="ecogesteCallback"
        />
      </v-card>
    </v-slide-x-transition>

    <!-- Top GES item bar chart -->
    <v-card max-width="700" class="mx-auto my-3 pa-3" v-show="ges_total > 0">
      <v-card-title>Vos principaux postes d'émissions</v-card-title>
      <v-card-subtitle class="text-left">
        Cliquez sur un élément pour obtenir une liste d'écogestes
      </v-card-subtitle>
      <div class="chartAreaWrapper">
        <chart-bar
          :style="{ width: chart_scroll }"
          :input_data="top_ges"
          v-show="ges_total > 0"
          @ecogeste-selected="ecogesteCallback"
        ></chart-bar>
      </div>
    </v-card>

    <!-- Écogeste placeholder -->
    <ecogestes ref="écogeste" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ChartDoughnut from './ResultatsChartDoughnut.vue'
import ChartSubDoughnut from './ResultatsChartSubDoughnut.vue'
import ChartBar from './ResultatsChartBar.vue'
import Ecogestes from '@/components/ecogestes/Ecogestes.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    ChartDoughnut,
    ChartSubDoughnut,
    ChartBar,
    Ecogestes
  },
  data() {
    return {
      subplot: {
        data: [],
        display: false,
        category: ''
      },
      show_main_chart: true
    }
  },
  computed: {
    ...mapGetters({
      gesByCatTotal: 'ges/gesByCatTotal',
      gesByCat: 'ges/gesByCat',
      ges_total: 'ges/gesTotal',
      top_ges: 'ges/topGes'
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
      this.show_main_chart = false
    },
    closeSubplotCallback() {
      this.subplot.display = false
      this.show_main_chart = true
    },
    ecogesteCallback(item: string) {
      // TODO: Specify the ges item clicked by the user
      // TODO: either by passing it to the Ecogeste component or via the store
      let ecogeste = this.$refs.écogeste as Vue & {
        openEcogeste: (ges_item_name: string) => void
      }
      ecogeste.openEcogeste(item)
    }
  }
})
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
