import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import transports from '@/store/modules/transports'
import { categories, CategoryState } from '@/store/modules/categories'
import { logement, LogementState } from '@/store/modules/logement'
import { alimentation, AlimentationState } from '@/store/modules/alimentation'
import consommation from '@/store/modules/consommation'
import { ges, GESState } from '@/store/modules/ges'

import { Store as storeTransports } from '@/plugins/transports_ges'
import { Store as storeConsommation } from '@/plugins/consommation_ges'

Vue.use(Vuex)

export interface RootState {
  alimentation: AlimentationState
  transports: storeTransports
  logement: LogementState
  consommation: storeConsommation
  categories: CategoryState
  ges: GESState
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
