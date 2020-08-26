import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import transports from '@/store/modules/transports'
import categories from '@/store/modules/categories'
import logement from '@/store/modules/logement'
import alimentation from '@/store/modules/alimentation'
import consommation from '@/store/modules/consommation'
import ges from '@/store/modules/ges'

import { Store as storeAlimentation } from '@/plugins/alimentation_ges'
import { Store as storeTransports } from '@/plugins/transports_ges'
import { Store as storeConsommation } from '@/plugins/consommation_ges'
import { Store as storeLogement } from '@/plugins/logement_ges'
import { Store as storeCategories } from '@/store/modules/categories'

Vue.use(Vuex)

export interface RootState {
  alimentation: storeAlimentation
  transports: storeTransports
  logement: storeLogement
  consommation: storeConsommation
  categories: storeCategories
}

const store: StoreOptions<RootState> = {
  modules: {
    transports,
    categories,
    logement,
    alimentation,
    consommation,
    ges
  }
}

export default new Vuex.Store<RootState>(store)
