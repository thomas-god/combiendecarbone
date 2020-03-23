import { mdiAirplane, mdiCar, mdiTrain, mdiBike, mdiBusMultiple } from '@mdi/js'
import { computeDistance } from '../../plugins/transports_distance.js'

const modes = [
  { name: 'Voiture', icon: mdiCar },
  { name: 'Métro/Bus', icon: mdiBusMultiple },
  { name: 'Vélo', icon: mdiBike },
  { name: 'TGV', icon: mdiTrain },
  { name: 'Avion', icon: mdiAirplane }
]
var id = 0
export default {
  namespaced: true,
  state: {
    travels: [],
    modes
  },
  getters: {
    getModesNames(state) {
      return state.modes.map(mode => mode.name)
    },
    getIconByMode: state => modeName => {
      return state.modes.find(mode => mode.name === modeName).icon
    },
    getTravelCopy: state => travelId => {
      return JSON.parse(
        JSON.stringify(state.travels.find(travel => travel.id === travelId))
      )
    }
  },
  mutations: {
    insertTravel(state, travel) {
      id++
      let newTravel = {
        ...travel,
        id
      }
      state.travels.push(JSON.parse(JSON.stringify(newTravel)))
    },
    updateTravel(state, new_travel) {
      let travel_id = state.travels.findIndex(
        travel => travel.id === new_travel.id
      )
      if (travel_id > -1) {
        state.travels[travel_id] = new_travel
      }
    },
    deleteTravel(state, id) {
      const arrId = state.travels.findIndex(item => item.id === id)
      if (arrId > -1) {
        state.travels.splice(arrId, 1)
      }
    }
  },
  actions: {
    async insertTravel(context, travel) {
      travel = await computeDistance(travel)
      context.commit('insertTravel', travel)
      return 1
    },
    async updateTravel(context, new_travel) {
      new_travel.distances = await computeDistance(new_travel)
      context.commit('updateTravel', new_travel)
      return 1
    },
    deleteTravel(context, travelId) {
      context.commit('deleteTravel', travelId)
    }
  }
}
