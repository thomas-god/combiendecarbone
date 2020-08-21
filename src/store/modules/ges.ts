import { RootState } from '@/store/index'

export interface GesItem {
  name: string
  ges: number
  ecogeste?: string
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
      rootState: RootState,
      rootGetters: any
    ): GesTotalByCat {
      const ges: GesTotalByCat = {
        Transports: rootGetters['transports/getGes'].total,
        Logement: rootState.logement.ges.total,
        Alimentation: rootState.alimentation.ges.total,
        Consommation: rootState.consommation.ges.total
      }
      return ges
    },
    gesByCat(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): GesByCat {
      const ges: GesByCat = {
        Transports: rootGetters['transports/getGes'].items,
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
        getters.gesByCat[cat].forEach((item: GesItem) => {
          if (item.ges > 0) {
            ges.push(item)
          }
        })
      })
      ges.sort((a, b) => b.ges - a.ges)
      return ges
    }
  }
}
