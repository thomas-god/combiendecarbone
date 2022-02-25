import Vue from 'vue'
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState } from '@/ui/store/index'
import * as Consommation from '@/ui/plugins/consommation_ges'

/**
 * State.
 */
export { Store as ConsommationState } from '@/ui/plugins/consommation_ges'
export const state: Consommation.Store = {
  consommation: {
    Vêtements: Consommation.vetements_options,
    'High-tech': Consommation.high_tech_options,
    Électroménager: Consommation.electromenager_options
  },
  ges: {
    total: 0,
    items: []
  }
}

/**
 * Getters.
 */
export const getters: GetterTree<Consommation.Store, RootState> = {
  getConsoByCategory(state) {
    return (cat: string): Consommation.ConsommationItem[] => {
      return state.consommation[cat]
    }
  }
}

/**
 * Mutations.
 */
export const mutations: MutationTree<Consommation.Store> = {
  updateConso(
    state,
    {
      category,
      update
    }: { category: string; update: Consommation.ConsommationItem[] }
  ): void {
    Vue.set(state.consommation, category, update)
  },
  updateGes(state): void {
    Vue.set(state, 'ges', Consommation.computeGes(state.consommation))
  }
}

/**
 * Actions.
 */
export const actions: ActionTree<Consommation.Store, RootState> = {
  updateConso(
    context,
    payload: {
      category: string
      update: Consommation.ConsommationItem[]
    }
  ): void {
    context.commit('updateConso', payload)
    context.commit('updateGes')
  }
}

/**
 * Module.
 */
export const consommation: Module<Consommation.Store, RootState> = {
  namespaced: true,
  state: state,
  getters,
  mutations,
  actions
}
