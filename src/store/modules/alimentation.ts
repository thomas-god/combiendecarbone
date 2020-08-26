import Vue from 'vue'
import { alimentation } from '@/plugins/alimentation_ges'
import * as Alimentation from '@/plugins/alimentation_ges'

const store: Alimentation.Store = {
  freq: alimentation.freq,
  regimes: alimentation.regimes,
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

export default {
  namespaced: true,
  state: store,
  getters: {
    getFreq(state: Alimentation.Store): Alimentation.weekFreq[] {
      return state.freq
    },
    getItems(state: Alimentation.Store): Alimentation.RegimeItem[] {
      return state.regimes
    },
    getRegime(state: Alimentation.Store): Alimentation.UserRegime {
      return state.regime
    }
  },
  mutations: {
    setRegime(
      state: Alimentation.Store,
      new_regime: Alimentation.UserRegime
    ): void {
      Vue.set(state, 'regime', new_regime)
    },
    updateGes(state: Alimentation.Store): void {
      Vue.set(state, 'ges', alimentation.computeGes(state.regime))
    }
  },
  actions: {
    setRegime(context: any, new_regime: Alimentation.UserRegime): void {
      context.commit('setRegime', new_regime)
      context.commit('updateGes')
    }
  }
}
