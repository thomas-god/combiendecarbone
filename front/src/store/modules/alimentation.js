import Vue from 'vue'

const labels = [
  'Jamais',
  '1-2 fois par semaine',
  '1 fois par jour',
  'A tous les repas'
]

const regime_items = [
  { name: 'viande_rouge', text: 'Viande rouge' },
  { name: 'viande_blanche', text: 'Viande blanche' },
  { name: 'oeufs_fromage', text: 'Oeufs et produits laitiers' },
  { name: 'bio', text: 'Produits bios' },
  { name: 'local', text: 'Produits locaux' }
]

export default {
  namespaced: true,
  state: {
    labels: labels,
    regime_items: regime_items,
    regime: {}
  },
  getters: {
    getLabels(state) {
      return state.labels
    },
    getRegimeItems(state) {
      return state.regime_items
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
      // TODO add GES computation
      context.commit('setRegime', new_regime)
    }
  }
}
