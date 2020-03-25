import Vue from 'vue'
import Vuex from 'vuex'
import transports from './modules/transports.js'
import categories from './modules/categories.js'
import logement from './modules/logement.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    transports,
    categories,
    logement
  }
})
