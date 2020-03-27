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
    consommation: {}
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
    }
  },
  actions: {
    updateConso(context, update) {
      context.commit('updateConso', update)
    }
  }
}