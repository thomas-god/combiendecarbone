import {
  mdiAirplane,
  mdiHomeCity,
  mdiChartPie,
  mdiFoodForkDrink,
  mdiCart
} from '@mdi/js'

export interface Category {
  id: number
  name: string
  icon: string
  color: string
}

export interface Store {
  categories: Category[]
}

const store: Store = {
  categories: [
    { id: 1, name: 'Transports', icon: mdiAirplane, color: 'red' },
    { id: 2, name: 'Logement', icon: mdiHomeCity, color: 'blue' },
    { id: 3, name: 'Alimentation', icon: mdiFoodForkDrink, color: 'green' },
    { id: 4, name: 'Consommation', icon: mdiCart, color: 'orange' },
    { id: 5, name: 'Résultats', icon: mdiChartPie, color: '' }
  ]
}

export default {
  namespaced: true,
  state: store,
  getters: {
    getCategories(state: Store): Category[] {
      return state.categories
    },
    getCategoriesNames(state: Store): string[] {
      return state.categories.map(mode => mode.name)
    },
    getCategoriesIcons(state: Store): string[] {
      return state.categories.map(mode => mode.icon)
    },
    getIconByMode: (state: Store) => (modeName: string) => {
      const mode = state.categories.find(mode => mode.name === modeName)
      return mode ? mode.icon : ''
    },
    getCategoriesColors(state: Store): Record<string, string> {
      const colors: Record<string, string> = {}
      state.categories.forEach(cat => {
        colors[cat.name] = cat.color
      })
      return colors
    }
  }
}
