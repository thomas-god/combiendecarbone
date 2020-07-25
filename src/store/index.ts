import Vue from 'vue'
import Vuex from 'vuex'
import transports from '@/store/modules/transports'
import categories from '@/store/modules/categories'
import logement from '@/store/modules/logement'
import alimentation from '@/store/modules/alimentation'
import consommation from '@/store/modules/consommation'
import ges from '@/store/modules/ges'

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
