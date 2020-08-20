import { RootState } from '@/store/index'

export interface GesItem {
  name: string
  ges: number
}

export interface GesCategory {
  total: number
  items: GesItem[]
}

interface GesTotalByCat {
  Transports: number
  Logement: number
  Alimentation: number
  Consommation: number
}

interface GesByCat {
  Transports: GesItem[]
  Logement: GesItem[]
  Alimentation: GesItem[]
  Consommation: GesItem[]
}

export default {
  namespaced: true,
  state: {},
  getters: {
    gesTotal(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): number {
      let ges = 0
      for (const cat in getters.gesByCatTotal) {
        ges += getters.gesByCatTotal[cat]
      }
      return ges
    },
    gesByCatTotal(
      state: any,
      getters: any,
      rootState: RootState
    ): GesTotalByCat {
      const ges: GesTotalByCat = {
        Transports: 0,
        Logement: 0,
        Alimentation: 0,
        Consommation: 0
      }
      if (rootState.transports.travels.length > 0) {
        ges.Transports = rootState.transports.travels
          .map(travel => travel.ges)
          .reduce((sum, i) => (sum as number) + (i as number)) as number
      } else {
        ges.Transports = 0
      }

      ges.Logement = rootState.logement.ges.total

      ges.Alimentation = rootState.alimentation.ges.total

      ges.Consommation = rootState.consommation.ges.total
      return ges
    },
    gesByCat(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): GesByCat {
      const ges: GesByCat = {
        Transports: rootGetters['transports/getGes'],
        Logement: rootState.logement.ges.items,
        Alimentation: rootState.alimentation.ges.items,
        Consommation: rootState.consommation.ges.items
      }
      return ges
    },

    topGes(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): GesItem[] {
      const ges: GesItem[] = []
      Object.keys(getters.gesByCat).forEach(cat => {
        Object.keys(getters.gesByCat[cat]).forEach(item => {
          if (getters.gesByCat[cat][item] > 0) {
            ges.push({ name: item, ges: getters.gesByCat[cat][item] })
          }
        })
      })
      ges.sort((a, b) => b.ges - a.ges)
      return ges
    },
    topGesAsChartData(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): ChartData {
      const ges = getters.topGes
      return {
        datasets: [
          {
            barThickness: 30,
            data: ges.map((e: GesItem) => round(e.ges, 2)),
            backgroundColor: ges.map(() => '#607D8B')
          }
        ],
        labels: ges.map((e: GesItem) => e.name)
      }
    }
  }
}

function round(num: number, n: number): number {
  return Math.round((num + Number.EPSILON) * 10 ** n) / 10 ** n
}
