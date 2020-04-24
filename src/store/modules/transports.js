import { mdiAirplane, mdiCar, mdiTrain, mdiBike, mdiBusMultiple } from '@mdi/js'
import { computeDistance } from '../../plugins/transports_distance.js'
import { computeGes } from '../../plugins/transports_ges.js'
import Vue from 'vue'

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
    modes,
    current_id: -1
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
    },
    getTravelsReguliers: state => {
      return state.travels.filter(travel => travel.type === 'Régulier')
    },
    getTravelsOccasionnels: state => {
      return state.travels.filter(travel => travel.type === 'Occasionnel')
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
        Vue.set(state.travels, travel_id, new_travel)
      }
    },
    deleteTravel(state, id) {
      const travel_id = state.travels.findIndex(item => item.id === id)
      if (travel_id > -1) {
        Vue.delete(state.travels, travel_id)
      }
    },
    updateCurrentId(state, new_id) {
      state.current_id = new_id
    }
  },
  actions: {
    async insertTravel(context, travel) {
      travel = await computeDistance(travel)
      travel = await computeGes(travel)
      context.commit('insertTravel', travel)
      // ? Qu'est ce que je dois retourner ?
      return 1
    },
    async updateTravel(context, new_travel) {
      new_travel = await computeDistance(new_travel)
      new_travel = await computeGes(new_travel)
      context.commit('updateTravel', new_travel)
      // ? Qu'est ce que je dois retourner ?
      return 1
    },
    deleteTravel(context, travelId) {
      context.commit('deleteTravel', travelId)
    },
    updateCurrentId(context, new_id) {
      context.commit('updateCurrentId', new_id)
    }
  }
}
