import { mdiAirplane, mdiCar, mdiTrain, mdiBike, mdiBusMultiple } from '@mdi/js'

const modes = [
  { name: 'Voiture', icon: mdiCar },
  { name: 'Métro/Bus', icon: mdiBusMultiple },
  { name: 'Vélo', icon: mdiBike },
  { name: 'TGV', icon: mdiTrain },
  { name: 'Avion', icon: mdiAirplane }
]
export default {
  namespaced: true,
  state: {
    travels: [],
    modes
  },
    getModesNames(state) {
      return state.modes.map(mode => mode.name)
    },
    getIconByMode: state => modeName => {
      return state.modes.find(mode => mode.name === modeName).icon
    },
  mutations: {
    insertTravel(state, travel) {
      id++
      let newTravel = {
        id,
        ...travel
      }
      state.travels.push(newTravel)
    },
    deleteTravel(state, id) {
      const arrId = state.travels.findIndex(item => item.id === id)
      if (arrId > -1) {
        state.travels.splice(arrId, 1)
      }
    }
  },
  actions: {
    insertTravel(context, travel) {
      context.commit('insertTravel', travel)
    },
    deleteTravel(context, travelId) {
      context.commit('deleteTravel', travelId)
    }
  }
}
