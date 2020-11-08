import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { transports, TransportsState } from '@/store/modules/transports'
import { categories, CategoryState } from '@/store/modules/categories'
import { logement, LogementState } from '@/store/modules/logement'
import { alimentation, AlimentationState } from '@/store/modules/alimentation'
import { consommation, ConsommationState } from '@/store/modules/consommation'
import { ges, GESState } from '@/store/modules/ges'
import { services, ServicesState } from '@/store/modules/services_publics'

Vue.use(Vuex)

export interface RootState {
  alimentation: AlimentationState
  transports: TransportsState
  logement: LogementState
  consommation: ConsommationState
  categories: CategoryState
  services: ServicesState
  ges: GESState
}

const store: StoreOptions<RootState> = {
  modules: {
    transports,
    categories,
    logement,
    alimentation,
    consommation,
    services,
    ges
  }
}

export default new Vuex.Store<RootState>(store)
