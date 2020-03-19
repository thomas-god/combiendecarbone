var id = 3

const modes = ['Voiture', 'Métro/Bus', 'Vélo', 'TGV', 'Avion']

export default {
  namespaced: true,
  state: {
    travels: [],
    modes
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
