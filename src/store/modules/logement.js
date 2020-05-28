import Vue from 'vue'
import { logement } from '../../plugins/logement_ges.js'

export default {
  namespaced: true,
  state: {
    consommation: {
      type: '',
      factures: {},
      form: {}
    },
    equipements: logement.equipements,
    chauffage: logement.chauffage,
    isolation: logement.isolation,
    ges: {
      total: 0,
      items: {}
    }
  },
  getters: {
    getConsommation(state) {
      return state.consommation
    },
    getEquipements(state) {
      return state.equipements
    },
    getChauffage(state) {
      return state.chauffage
    },
    getIsolation(state) {
      return state.isolation
    }
  },
  mutations: {
    updateConsommation(state, new_conso) {
      Vue.set(state, 'consommation', new_conso)
    },
    resetConsommation(state) {
      Vue.set(state, 'consommation', {})
    },
    updateGes(state) {
      let ges = logement.computeGes(state.consommation)
      Vue.set(state, 'ges', ges)
    }
  },
  actions: {
    updateConsommation(context, new_conso) {
      // TODO: new_factures = await computeGes(new_factures)
      context.commit('updateConsommation', new_conso)
      context.commit('updateGes')
    },
    resetConsommation(context) {
      context.commit('resetConsommation')
      context.commit('updateGes')
    }
  }
}
