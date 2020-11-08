import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { GESItem } from '@/store/modules/ges'

/**
 * State.
 */
export interface ServicesState {
  items: GESItem[]
  total: number
}
export const state: ServicesState = {
  items: [
    {
      label: 'Services publics',
      value: 1200,
      category: 'Services',
      ecogeste: {
        name: 'EcogesteServicesPublics'
      }
    }
  ],
  total: 1200
}

/**
 * Module.
 */
export const services: Module<ServicesState, RootState> = {
  namespaced: true,
  state
}
