import {
  GESCategoryLogement,
  ges_values,
  default_ecogeste
} from './logement_ges'

export interface LogementFormEstimation {
  efficient_appliances_ratio: string
  heating_source: string
  isolation: string
  elec_offre_verte: boolean
  gaz_offre_verte: boolean
}

export const state: LogementFormEstimation = {
  efficient_appliances_ratio: '',
  heating_source: '',
  isolation: '',
  elec_offre_verte: false,
  gaz_offre_verte: false
}

/**
 * Part des équipements électroménagers basse consommation d'un foyer.
 * Valeur annuelle en kWh, d'après Bilan RTE 2016.
 */
const appliances = [
  {
    label: 'Aucun',
    value: 1300 + (3400 - 1300) * 1 * ges_values.elec,
    source: 'elec'
  },
  {
    label: 'Quelques-uns',
    value: 1300 + (3400 - 1300) * 0.75 * ges_values.elec,
    source: 'elec'
  },
  {
    label: 'La plupart',
    value: 1300 + (3400 - 1300) * 0.25 * ges_values.elec,
    source: 'elec'
  },
  {
    label: 'Tous',
    value: 1300 + (3400 - 1300) * 0 * ges_values.elec,
    source: 'elec'
  }
] as const
export const appliances_options: string[] = appliances.map(r => r.label)

/**
 * Consommations annuelles du chauffage en kWh pour un logement type (env. 30m2)
 */
const heating = [
  {
    label: 'Électrique',
    value: 52 * 30 * ges_values.elec, // Bilan RTE 2016
    source: 'elec'
  },
  {
    label: 'Au gaz',
    value: 4300 * ges_values.gaz, //https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
    source: 'gaz'
  }
] as const
export const heating_options: string[] = heating.map(r => r.label)

/**
 * Isolation du logement.
 */
const isolation = [
  {
    label: 'Ancien',
    value: 1
  },
  {
    label: 'Neuf',
    value: 0.25
  }
] as const
export const isolation_options: string[] = isolation.map(r => r.label)

/**
 * Calcule les émissions de GES.
 * @param form User's inputs.
 */
export function computeGes(form: LogementFormEstimation): GESCategoryLogement {
  const ges: GESCategoryLogement = {
    items: [],
    total: 0
  }

  /**
   * Consommation des équipements.
   */
  const item_appliances = appliances.find(
    item => item.label === form.efficient_appliances_ratio
  )
  if (item_appliances)
    ges.items.push({
      category: 'Logement',
      label: `Équipements`,
      value: item_appliances.value,
      metadata: { source: item_appliances.source, usage: 'appliances' },
      ecogeste: default_ecogeste
    })

  /**
   * Chauffage.
   */
  const item_heating = heating.find(
    item => item.label === form.efficient_appliances_ratio
  )
  const item_isolation = isolation.find(item => item.label === form.isolation)
  if (item_heating)
    ges.items.push({
      category: 'Logement',
      label: `Chauffage - (${item_heating.label})`,
      value:
        item_heating.value *
        (item_isolation === undefined ? 1 : item_isolation.value),
      metadata: { source: item_heating.source, usage: 'heating' },
      ecogeste: default_ecogeste
    })

  /**
   * Émissions totales.
   */
  ges.total = ges.items.reduce((sum, item) => sum + item.value, 0)

  return ges
}
