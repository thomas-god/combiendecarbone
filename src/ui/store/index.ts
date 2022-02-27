import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { transports, TransportsState } from '@/ui/store/modules/transports';
import { categories, CategoryState } from '@/ui/store/modules/categories';
import { logement, LogementState } from '@/ui/store/modules/logement';
import {
  alimentation,
  AlimentationState,
} from '@/ui/store/modules/alimentation';
import {
  consommation,
  ConsommationState,
} from '@/ui/store/modules/consommation';
import { ges, GESState } from '@/ui/store/modules/ges';
import { services, ServicesState } from '@/ui/store/modules/services_publics';

Vue.use(Vuex);

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
    ges,
  },
};

export default new Vuex.Store<RootState>(store);
