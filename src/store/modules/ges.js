export default {
  namespaced: true,
  state: {
    toto: 'toto'
  },
  getters: {
    getTotalGes(state, getters, rootState) {
      let ges = {}
      if (rootState.transports.travels.length > 0) {
        ges.Transports = rootState.transports.travels
          .map(travel => travel.ges)
          .reduce((sum, i) => sum + i)
      } else {
        ges.Transports = 0
      }

      ges.Logement = rootState.logement.ges.total

      ges.Alimentation = rootState.alimentation.ges

      ges.Consommation = rootState.consommation.ges.total
      return ges
    }
  }
}
