import Vue from 'vue'
import { alimentation } from '@/plugins/alimentation_ges'

export default {
  namespaced: true,
  state: {
    freq: alimentation.freq,
    items: alimentation.items,
    regime: {},
    ges: {
      total: 0,
      items: {}
    }
  },
  getters: {
    getFreq(
      state: Alimentation.store
    ): keyof typeof Alimentation.WeeklyFrequency {
      return state.freq
    },
    getItems(state: Alimentation.store): Alimentation.regimeItem[] {
      return state.items
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
