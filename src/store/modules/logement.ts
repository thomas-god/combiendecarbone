import Vue from 'vue'
import { computeGes } from '../../plugins/logement_ges'
import * as Logement from '@/types/logement'

const store: Logement.store = {
  consommation: {
    type: ''
  },
  ges: {
    total: 0,
    items: {}
  }
}

export default {
  namespaced: true,
  state: store,
  getters: {
    getConsommation(state: Logement.store): Logement.UserForm {
      return state.consommation
    },
    getEquipements(): string[] {
      return Object.keys(Logement.Equipements)
    },
    getChauffage(): string[] {
      return Object.keys(Logement.Chauffage)
    },
    getIsolation(): string[] {
      return Object.keys(Logement.Isolation)
    }
  },
  mutations: {
    updateConsommation(
      state: Logement.store,
      new_conso: Logement.UserForm
    ): void {
      Vue.set(state, 'consommation', new_conso)
    },
    resetConsommation(state: Logement.store): void {
      Vue.set(state, 'consommation', {})
    },
    updateGes(state: Logement.store): void {
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
