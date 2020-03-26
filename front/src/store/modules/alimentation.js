import Vue from 'vue'
import { alimentation } from '../../plugins/alimentation_ges.js'

export default {
  namespaced: true,
  state: {
    freq: alimentation.freq,
    items: alimentation.items,
    regime: {}
  },
  getters: {
    getFreq(state) {
      return state.freq
    },
    getItems(state) {
      return state.items
    },
    getRegime(state) {
      return state.regime
    }
  },
  mutations: {
    setRegime(state, new_regime) {
      Vue.set(state, 'regime', new_regime)
    }
  },
  actions: {
    setRegime(context, new_regime) {
      new_regime.ges = alimentation.computeGes(new_regime)
      context.commit('setRegime', new_regime)
    }
  }
}
