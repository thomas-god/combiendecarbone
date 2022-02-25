import { GESCategory, GESItem, Ecogeste } from '@/ui/store/modules/ges'
import * as factures from '@/ui/plugins/ges_logement_factures'
import * as estimation from '@/ui/plugins/ges_logement_estimation'

export interface GESItemLogement extends GESItem {
  metadata: {
    source: string
    usage: 'appliances' | 'heating' | 'all'
  }
}

export interface GESCategoryLogement extends GESCategory {
  items: GESItemLogement[]
}

export function ges_values() {
  // kg CO2 eq./kWh (PCI le cas échéant)
  return {
    fioul: 0.324,
    bois: 0.03,
    gaz: 0.234,
    elec: 0.049
  }
}
export const default_ecogeste: Ecogeste = {
  name: 'EcogesteLogement'
}

export interface UserForm {
  id: number
  type: 'factures' | 'estimation' | ''
  inputs: estimation.LogementFormEstimation | factures.LogementFormFactures | {}
}

/**
 * Check if an object is compatible with the UserForm interface.
 * @param form Form object to check.
 */
export function checkLogementForm(form: UserForm): boolean {
  if (form.type === undefined) return false
  if (!['factures', 'estimation', ''].includes(form.type)) return false

  /**
   * Inputs field.
   */
  if (form.inputs === undefined) return false
  if (form.type === '' && form.inputs !== {}) return false
  if (
    form.type === 'factures' &&
    !factures.checkForm(form.inputs as factures.LogementFormFactures)
  )
    return false
  if (
    form.type === 'estimation' &&
    !estimation.checkForm(form.inputs as estimation.LogementFormEstimation)
  )
    return false
  return true
}

export interface Store {
  forms: UserForm[]
  ges: GESCategoryLogement
  next_form_id: number
}

export const heating_options = estimation.heating_options
export const appliances_options = estimation.appliances_options
export const isolation_options = estimation.isolation_options
export const default_form_estimation = estimation.default_form
export const default_form_factures = factures.default_form

export function computeGes(forms: UserForm[]): GESCategoryLogement {
  const ges: GESCategoryLogement = {
    items: [],
    total: 0
  }

  forms.forEach(form => {
    let form_ges: GESCategoryLogement = {
      items: [],
      total: 0
    }
    if (form.type === 'factures') {
      form_ges = factures.computeGes(
        form.inputs as factures.LogementFormFactures
      )
    }
    if (form.type === 'estimation') {
      form_ges = estimation.computeGes(
        form.inputs as estimation.LogementFormEstimation
      )
    }
    ges.items.push(...form_ges.items)
    ges.total += form_ges.total
  })

  return ges
}
