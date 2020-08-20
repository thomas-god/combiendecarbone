import Vue from 'vue'
import { alimentation } from '@/plugins/alimentation_ges'
import * as Alimentation from '@/plugins/alimentation_ges'

const store: Alimentation.store = {
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
    getFreq(state: Alimentation.store): Alimentation.weekFreq[] {
      return state.freq
    },
    getItems(state: Alimentation.store): Alimentation.regimeItem[] {
      return state.regimes
    },
    getRegime(state: Alimentation.store): Alimentation.userRegime {
      return state.regime
    }
  },
  mutations: {
    setRegime(
      state: Alimentation.store,
      new_regime: Alimentation.userRegime
    ): void {
      Vue.set(state, 'regime', new_regime)
    },
    updateGes(state: Alimentation.store): void {
      Vue.set(state, 'ges', alimentation.computeGes(state.regime))
    }
  },
  actions: {
    setRegime(context: any, new_regime: Alimentation.userRegime): void {
      context.commit('setRegime', new_regime)
      context.commit('updateGes')
    }
  }
}
