//import Vue from 'vue'
import { consommation } from '../../plugins/consommation_ges.js'

export default {
  namespaced: true,
  state: {
    vetements: consommation.vetements,
    high_tech: consommation.high_tech,
    electromenager: consommation.electromenager
  },
  getters: {
    getVetements(state) {
      return state.vetements
    },
    getHighTech(state) {
      return state.high_tech
    },
    getElectromenager(state) {
      return state.electromenager
    },
    getItems(state) {
      return {
        vet: state.vetements,
        elec: state.high_tech,
        ht: state.electromenager
      }
    }
  }
}
