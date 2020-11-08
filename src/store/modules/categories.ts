import { GetterTree, Module } from 'vuex'
import { RootState } from '@/store/index'
import {
  mdiAirplane,
  mdiHomeCity,
  mdiChartPie,
  mdiFoodForkDrink,
  mdiCart,
  mdiBank
} from '@mdi/js'

export interface Category {
  id: number
  name: string
  icon: string
  color: string
}

/**
 * State.
 */
export interface CategoryState {
  categories: Category[]
}
export const state: CategoryState = {
  categories: [
    { id: 1, name: 'Transports', icon: mdiAirplane, color: 'red' },
    { id: 2, name: 'Logement', icon: mdiHomeCity, color: 'blue' },
    { id: 3, name: 'Alimentation', icon: mdiFoodForkDrink, color: 'green' },
    { id: 4, name: 'Consommation', icon: mdiCart, color: 'orange' },
    { id: 5, name: 'Services', icon: mdiBank, color: 'deepPurple' },
    { id: 6, name: 'Résultats', icon: mdiChartPie, color: '' }
  ]
}

/**
 * Getters.
 */
export const getters: GetterTree<CategoryState, RootState> = {
  getCategories(state): Category[] {
    return state.categories
  },
  getCategoriesNames(state): string[] {
    return state.categories.map(mode => mode.name)
  },
  getCategoriesIcons(state): string[] {
    return state.categories.map(mode => mode.icon)
  },
  getIconByMode: state => (modeName: string) => {
    const mode = state.categories.find(mode => mode.name === modeName)
    return mode ? mode.icon : ''
  },
  getCategoriesColors(state): Record<string, string> {
    const colors: Record<string, string> = {}
    state.categories.forEach(cat => {
      colors[cat.name] = cat.color
    })
    return colors
  }
}

/**
 * Module.
 */
export const categories: Module<CategoryState, RootState> = {
  namespaced: true,
  state,
  getters
}
