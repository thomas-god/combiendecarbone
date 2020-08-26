import Vue from 'vue'
import { computeGes } from '../../plugins/logement_ges'
import * as Logement from '@/plugins/logement_ges'

const store: Logement.Store = {
  consommation: {
    type: '',
    form: {
      isolation: '',
      equipements: '',
      chauffage: ''
    },
    factures: {
      elec: 0,
      gaz: 0
    }
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
    getConsommation(state: Logement.Store): Logement.UserForm {
      return state.consommation
    },
    getEquipements(): string[] {
      return Logement.EquipementsKeys
    },
    getChauffage(): string[] {
      return Logement.ChauffageKeys
    },
    getIsolation(): string[] {
      return Logement.IsolationKeys
    }
  },
  mutations: {
    updateConsommation(
      state: Logement.Store,
      new_conso: Logement.UserForm
    ): void {
      Vue.set(state, 'consommation', new_conso)
    },
    resetConsommation(state: Logement.Store): void {
      Vue.set(state, 'consommation', {})
    },
    updateGes(state: Logement.Store): void {
      const ges = computeGes(state.consommation)
      Vue.set(state, 'ges', ges)
    }
  },
  actions: {
    updateConsommation(context: any, new_conso: Logement.UserForm): void {
      context.commit('updateConsommation', new_conso)
      context.commit('updateGes')
    },
    resetConsommation(context: any): void {
      context.commit('resetConsommation')
      context.commit('updateGes')
    }
  }
}
