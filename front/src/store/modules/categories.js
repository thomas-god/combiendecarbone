import {
  mdiAirplane,
  mdiHomeCity,
  mdiChartPie,
  mdiFoodForkDrink,
  mdiCart
} from '@mdi/js'

const categories = [
  { id: 1, name: 'Transports', icon: mdiAirplane },
  { id: 2, name: 'Logement', icon: mdiHomeCity },
  { id: 3, name: 'Alimentation', icon: mdiFoodForkDrink },
  { id: 4, name: 'Consommation', icon: mdiCart },
  { id: 5, name: 'Résultats', icon: mdiChartPie }
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
    }
  }
}
