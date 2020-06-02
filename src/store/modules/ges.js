export default {
  namespaced: true,
  state: {
    toto: 'toto'
  },
  getters: {
    getTotalGesByCat(state, getters, rootState) {
      let ges = {}
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
    getGesByCat(state, getters, rootState, rootGetters) {
      let ges = {
        Transports: rootGetters['transports/getGes'],
        Logement: rootState.logement.ges,
        Alimentation: rootState.alimentation.ges,
        Consommation: rootState.consommation.ges
      }
      return ges
    }
  }
}
