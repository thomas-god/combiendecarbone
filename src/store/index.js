import Vue from 'vue'
import Vuex from 'vuex'
import transports from './modules/transports.js'
import categories from './modules/categories.js'
import logement from './modules/logement.js'
import alimentation from './modules/alimentation.js'
import consommation from './modules/consommation.js'
import ges from './modules/ges.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    transports,
    categories,
    logement,
    alimentation,
    consommation,
    ges
  }
})
