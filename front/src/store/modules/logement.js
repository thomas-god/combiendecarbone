import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    factures: {
      flag: '',
      elec: 0,
      gaz: 0
    }
  },
  getters: {
    getFactures(state) {
      return state.factures
    }
  },
  mutations: {
    updateFactures(state, new_factures) {
      Vue.set(state, 'factures', new_factures)
    },
    resetFactures(state) {
      Vue.set(state, 'factures', {})
    }
  },
  actions: {
    updateFactures(context, new_factures) {
      // TODO: new_factures = await computeGes(new_factures)
      context.commit('updateFactures', new_factures)
    },
    resetFactures(context, facturesId) {
      context.commit('resetFactures', facturesId)
    }
  }
}
