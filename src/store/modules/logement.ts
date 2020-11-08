import Vue from 'vue'
import Vuex, {
  Module,
  GetterTree,
  MutationTree,
  ActionTree,
  Commit
} from 'vuex'
import { RootState } from '../index'
import { computeGes } from '../../plugins/ges_logement'
import * as Logement from '@/plugins/ges_logement'
export { Store as LogementState } from '@/plugins/ges_logement'

/**
 * State
 */
export const state: Logement.Store = {
  forms: [],
  current_form_id: -1,
  ges: {
    items: [],
    total: 0
  }
}

/**
 * Actions
 */
export const actions: ActionTree<Logement.Store, RootState> = {
  updateConsommation(context, new_conso: Logement.UserForm): void {
    context.commit('updateConsommation', new_conso)
    context.commit('updateGes')
  },
  resetConsommation(context): void {
    context.commit('resetConsommation')
    context.commit('updateGes')
  }
}

/**
 * Mutations.
 */
export const mutations: MutationTree<Logement.Store> = {
  updateConsommation(state, new_conso: Logement.UserForm): void {
    Vue.set(state, 'consommation', new_conso)
  },
  resetConsommation(state): void {
    Vue.set(state, 'consommation', {})
  }
}

/**
 * Getters.
 */
export const getters: GetterTree<Logement.Store, RootState> = {
  default_forms(): Omit<Logement.UserForm, 'id'>[] {
    return [
      { type: 'factures', inputs: Logement.default_form_factures },
      { type: 'estimation', inputs: Logement.default_form_estimation }
    ]
  },
  appliances_options(): string[] {
    return Logement.appliances_options
  },
  heating_options(): string[] {
    return Logement.heating_options
  },
  isolation_options(): string[] {
    return Logement.isolation_options
  },
  forms(state) {
    return state.forms
  }
}

/**
 * Module.
 */
export const logement: Module<Logement.Store, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
