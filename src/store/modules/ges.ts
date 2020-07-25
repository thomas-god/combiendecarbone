interface GesTotalByCat {
  Transports: number
  Logement: number
  Alimentation: number
  Consommation: number
}

interface GesByCat {
  Transports: Record<string, number>[]
  Logement: Record<string, number>[]
  Alimentation: Record<string, number>[]
  Consommation: Record<string, number>[]
}

export default {
  namespaced: true,
  state: {
    toto: 'toto'
  },
  getters: {
    getTotalGesByCat(state, getters, rootState): GesTotalByCat {
      const ges: GesTotalByCat = {
        Transports: 0,
        Logement: 0,
        Alimentation: 0,
        Consommation: 0
      }
      if (rootState.transports.travels.length > 0) {
        ges.Transports = rootState.transports.travels
          .map(travel => travel.ges)
          .reduce((sum, i) => sum + i)
      } else {
        ges.Transports = 0
      }

      ges.Logement = rootState.logement.ges.total

      ges.Alimentation = rootState.alimentation.ges.total

      ges.Consommation = rootState.consommation.ges.total
      return ges
    },
    getGesByCat(state, getters, rootState, rootGetters): GesByCat {
      const ges: GesByCat = {
        Transports: rootGetters['transports/getGes'],
        Logement: rootState.logement.ges,
        Alimentation: rootState.alimentation.ges,
        Consommation: rootState.consommation.ges
      }
      return ges
    }
  }
}
