import {
  mdiAirplane,
  mdiHomeCity,
  mdiChartPie,
  mdiFoodForkDrink,
  mdiCart
} from '@mdi/js'

const categories = [
  { id: 1, name: 'Transports', icon: mdiAirplane, color: 'red' },
  { id: 2, name: 'Logement', icon: mdiHomeCity, color: 'blue' },
  { id: 3, name: 'Alimentation', icon: mdiFoodForkDrink, color: 'green' },
  { id: 4, name: 'Consommation', icon: mdiCart, color: 'orange' },
  { id: 5, name: 'Résultats', icon: mdiChartPie, color: '' }
]

export default {
  namespaced: true,
  state: {
    categories
  },
  getters: {
    getCategories(state) {
      return state.categories
    },
    getCategoriesNames(state) {
      return state.categories.map(mode => mode.name)
    },
    getCategoriesIcons(state) {
      return state.categories.map(mode => mode.icon)
    },
    getIconByMode: state => modeName => {
      return state.categories.find(mode => mode.name === modeName).icon
    },
    getCategoriesColors(state) {
      let colors = {}
      state.categories.forEach(cat => {
        colors[cat.name] = cat.color
      })
      return colors
    }
  }
}
