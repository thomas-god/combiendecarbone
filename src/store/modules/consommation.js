import Vue from 'vue'
import { consommation } from '../../plugins/consommation_ges.js'

export default {
  namespaced: true,
  state: {
    items: {
      Vêtements: consommation.vetements,
      'High-tech': consommation.high_tech,
      Électroménager: consommation.electromenager
    },
    consommation: {},
    ges: { total: 0 }
  },
  getters: {
    getItems(state) {
      return state.items
    },
    getItemsByCategory(state) {
      return cat => {
        return state.items[cat]
      }
    },
    getConsoByCategory(state) {
      return cat => {
        if (cat in state.consommation) {
          return state.consommation[cat]
        } else {
          return {}
        }
      }
    }
  },
  mutations: {
    updateConso(state, { category, update }) {
      Vue.set(state.consommation, category, update)
    },
    updateGes(state) {
      Vue.set(state, 'ges', consommation.computeGes(state.consommation))
    }
  },
  actions: {
    updateConso(context, payload) {
      context.commit('updateConso', payload)
      context.commit('updateGes')
    }
  }
}
