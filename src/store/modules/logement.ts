import Vue from 'vue'
import Vuex, {
  Module,
  GetterTree,
  MutationTree,
  ActionTree,
  Commit
} from 'vuex'
import { RootState } from '@/store/index'
import * as Logement from '@/plugins/ges_logement'
export { Store as LogementState } from '@/plugins/ges_logement'

/**
 * State.
 */
export const state: Logement.Store = {
  forms: [],
  next_form_id: 0,
  ges: {
    items: [],
    total: 0
  }
}

/**
 * Actions.
 */
export const actions: ActionTree<Logement.Store, RootState> = {
  updateForm(context, form: Logement.UserForm): void {
    if (form.id > -1) {
      context.commit('UPDATE_FORM', form)
    } else {
      context.commit('ADD_FORM', form)
    }
    context.commit('COMPUTE_GES')
  }
}

/**
 * Mutations.
 */
export const mutations: MutationTree<Logement.Store> = {
  ADD_FORM(state, form: Logement.UserForm): void {
    state.forms.push(
      JSON.parse(JSON.stringify({ ...form, id: state.next_form_id }))
    )
    state.next_form_id++
  },
  UPDATE_FORM(state, form: Logement.UserForm): void {
    const id = state.forms.findIndex(f => f.id === form.id)
    if (id > -1) {
      Vue.set(state.forms, id, JSON.parse(JSON.stringify(form)))
    }
  },
  DELETE_FORM(state, form: Logement.UserForm): void {
    const id = state.forms.findIndex(f => f.id === form.id)
    if (id > -1) {
      state.forms.splice(id, 1)
    }
  },
  COMPUTE_GES(state): void {
    const ges = Logement.computeGes(state.forms)
    Vue.set(state.ges, 'items', ges.items)
    Vue.set(state.ges, 'total', ges.total)
  }
}

/**
 * Getters.
 */
export const getters: GetterTree<Logement.Store, RootState> = {
  default_forms(): Logement.UserForm[] {
    return [
      {
        type: 'factures',
        inputs: JSON.parse(JSON.stringify(Logement.default_form_factures)),
        id: -1
      },
      {
        type: 'estimation',
        inputs: JSON.parse(JSON.stringify(Logement.default_form_estimation)),
        id: -1
      }
    ]
  },
  appliances_options(): string[] {
    return Logement.appliances_options
  },
  heating_options(): string[] {
    return Logement.heating_options
  },
  isolation_options(): string[] {
    return Logement.isolation_options
  },
  forms(state) {
    return JSON.parse(JSON.stringify(state.forms))
  }
}

/**
 * Module.
 */
export const logement: Module<Logement.Store, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
