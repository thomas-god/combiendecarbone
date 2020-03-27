import Vue from 'vue'
import { computeGes } from '../../plugins/logement_ges.js'

export default {
  namespaced: true,
  state: {
    factures: {
      flag: '',
      elec: 0,
      gaz: 0
    },
    ges: 0
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
    },
    updateGes(state) {
      let ges = computeGes(state)
      Vue.set(state, 'ges', ges)
    }
  },
  actions: {
    updateFactures(context, new_factures) {
      // TODO: new_factures = await computeGes(new_factures)
      context.commit('updateFactures', new_factures)
      context.commit('updateGes')
    },
    resetFactures(context) {
      context.commit('resetFactures')
      context.commit('updateGes')
    }
  }
}
