import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState } from '@/store/index'

export interface GESItem {
  label: string
  value: number
  category: string
  ecogeste?: Ecogeste
}

export interface Ecogeste {
  name: string
  props?: any
}

export interface GESCategory {
  items: GESItem[]
  total: number
}

interface GesTotalByCat {
  Transports: number
  Logement: number
  Alimentation: number
  Consommation: number
}

interface GesByCat {
  Transports: GESItem[]
  Logement: GESItem[]
  Alimentation: GESItem[]
  Consommation: GESItem[]
}

/**
 * State.
 */
/* eslint-disable @typescript-eslint/no-empty-interface*/
export interface GESState {}
const state: GESState = {}

/**
 * Getters.
 */
export const getters: GetterTree<GESState, RootState> = {
  gesByCat(state, getters, rootState, rootGetters): GesByCat {
    const ges: GesByCat = {
      Transports: rootGetters['transports/getGes'].items,
      Logement: rootState.logement.ges.items,
      Alimentation: rootState.alimentation.ges.items,
      Consommation: rootState.consommation.ges.items
    }
    return ges
  },
  gesTotal(state, getters): number {
    let ges = 0
    for (const cat in getters.gesByCatTotal) {
      ges += getters.gesByCatTotal[cat]
    }
    return ges
  },
  gesByCatTotal(state, getters, rootState, rootGetters): GesTotalByCat {
    const ges: GesTotalByCat = {
      Transports: rootGetters['transports/getGes'].total,
      Logement: rootState.logement.ges.total,
      Alimentation: rootState.alimentation.ges.total,
      Consommation: rootState.consommation.ges.total
    }
    return ges
  },
  topGes(state, getters): GESItem[] {
    const ges: GESItem[] = []
    Object.keys(getters.gesByCat).forEach(cat => {
      getters.gesByCat[cat].forEach((item: GESItem) => {
        if (item.value > 0) {
          ges.push(item)
        }
      })
    })
    ges.sort((a, b) => b.value - a.value)
    return ges
  }
}

export const ges: Module<GESState, RootState> = {
  namespaced: true,
  state,
  getters
}
