import Vue from 'vue'
import { consommation, computeGes } from '../../plugins/consommation_ges'

const state: Consommation.store = {
  items: {
    Vêtements: consommation.vetements,
    'High-tech': consommation.high_tech,
    Électroménager: consommation.electromenager
  },
  consommation: {},
  ges: {
    total: 0,
    items: {}
  }
}

export default {
  namespaced: true,
  state: state,
  getters: {
    getItems(
      state: Consommation.store
    ): Record<string, Consommation.ConsommationItem[]> {
      return state.items
    },
    getItemsByCategory(state: Consommation.store) {
      return (cat: string): Consommation.ConsommationItem[] => {
        return state.items[cat]
      }
    },
    getConsoByCategory(state: Consommation.store) {
      return (cat: string): Consommation.ConsommationItem[] => {
        if (cat in state.consommation) {
          return state.consommation[cat]
        } else {
          return []
        }
      }
    }
  },
  mutations: {
    updateConso(
      state: Consommation.store,
      {
        category,
        update
      }: { category: string; update: Consommation.ConsommationItem[] }
    ): void {
      Vue.set(state.consommation, category, update)
    },
    updateGes(state: Consommation.store): void {
      Vue.set(state, 'ges', computeGes(state.consommation))
    }
  },
  actions: {
    updateConso(
      context: any,
      payload: { category: string; update: Consommation.ConsommationItem[] }
    ): void {
      context.commit('updateConso', payload)
      context.commit('updateGes')
    }
  }
}
