import {
  mdiAirplane,
  mdiHomeCity,
  mdiChartPie,
  mdiFoodForkDrink,
  mdiCart
} from '@mdi/js'

interface category {
  id: number
  name: string
  icon: string
  color: string
}

interface store {
  categories: category[]
}

const store: store = {
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
    getCategories(state: store): category[] {
      return state.categories
    },
    getCategoriesNames(state: store): string[] {
      return state.categories.map(mode => mode.name)
    },
    getCategoriesIcons(state: store): string[] {
      return state.categories.map(mode => mode.icon)
    },
    getIconByMode: (state: store) => (modeName: string) => {
      const mode = state.categories.find(mode => mode.name === modeName)
      return mode ? mode.icon : ''
    },
    getCategoriesColors(state: store): Record<string, string> {
      const colors = {}
      state.categories.forEach(cat => {
        colors[cat.name] = cat.color
      })
      return colors
    }
  }
}
