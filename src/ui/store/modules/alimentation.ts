import Vue from 'vue'
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState } from '@/ui/store/index'
import * as Alimentation from '@/ui/plugins/alimentation_ges'

/**
 * State.
 */
export { Store as AlimentationState } from '@/ui/plugins/alimentation_ges'
export const state: Alimentation.Store = {
  freq: Alimentation.item_freq,
  regimes: Alimentation.regimes,
  regime: {
    bio: '',
    local: '',
    viande_blanche: '',
    viande_rouge: ''
  },
  ges: {
    total: 0,
    items: []
  }
}

/**
 * Getters.
 */
export const getters: GetterTree<Alimentation.Store, RootState> = {
  getFreq(state): Alimentation.weekFreq[] {
    return state.freq
  },
  getItems(state): Alimentation.RegimeItem[] {
    return state.regimes
  },
  getRegime(state): Alimentation.UserRegime {
    return state.regime
  }
}

/**
 * Mutations.
 */
export const mutations: MutationTree<Alimentation.Store> = {
  setRegime(state, new_regime: Alimentation.UserRegime): void {
    Vue.set(state, 'regime', new_regime)
  },
  updateGes(state): void {
    Vue.set(state, 'ges', Alimentation.computeGes(state.regime))
  }
}

/**
 * Actions.
 */
export const actions: ActionTree<Alimentation.Store, RootState> = {
  setRegime(context, new_regime: Alimentation.UserRegime): void {
    context.commit('setRegime', new_regime)
    context.commit('updateGes')
  }
}

export const alimentation: Module<Alimentation.Store, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
