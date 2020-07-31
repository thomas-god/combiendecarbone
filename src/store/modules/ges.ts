import { RootState } from '@/store/index'

interface GesTotalByCat {
  Transports: number
  Logement: number
  Alimentation: number
  Consommation: number
}

interface GesByCat {
  Transports: Record<string, number>
  Logement: Record<string, number>
  Alimentation: Record<string, number>
  Consommation: Record<string, number>
}

export default {
  namespaced: true,
  state: {},
  getters: {
    getTotalGesByCat(
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
    getGesByCat(
      state: any,
      getters: any,
      rootState: RootState,
      rootGetters: any
    ): GesByCat {
      const ges_transports: Record<string, number> = {}
      if (rootState.transports.travels.length > 0) {
        rootState.transports.travels.forEach(
          travel => (ges_transports[travel.name] = travel.ges as number)
        )
      }

      const ges: GesByCat = {
        Transports: ges_transports,
        Logement: rootState.logement.ges.items,
        Alimentation: rootState.alimentation.ges.items,
        Consommation: rootState.consommation.ges.items
      }
      return ges
    }
  }
}
