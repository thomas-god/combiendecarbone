import {
  GESCategoryLogement,
  ges_values,
  default_ecogeste
} from './ges_logement'

export interface LogementFormFactures {
  elec_conso_kwh: number
  elec_offre_verte: boolean
  gaz_conso_kwh: number
  gaz_offre_verte: boolean
  nb_habitants: number
}

export const default_form: LogementFormFactures = {
  elec_conso_kwh: 0,
  elec_offre_verte: false,
  gaz_conso_kwh: 0,
  gaz_offre_verte: false,
  nb_habitants: 1
}

export function computeGes(
  factures: LogementFormFactures
): GESCategoryLogement {
  const ges: GESCategoryLogement = {
    items: [],
    total: 0
  }

  const nb_habitants = factures.nb_habitants > 0 ? factures.nb_habitants : 1

  /**
   * Facture d'électricité.
   */
  if (factures.elec_conso_kwh > 0)
    ges.items.push({
      category: 'Logement',
      label: 'Electricité',
      value: (factures.elec_conso_kwh * ges_values().elec) / nb_habitants,
      metadata: { source: 'elec', usage: 'all' },
      ecogeste: default_ecogeste
    })

  /**
   * Facture de gaz.
   */
  if (factures.elec_conso_kwh > 0)
    ges.items.push({
      category: 'Logement',
      label: 'Gaz',
      value: (factures.gaz_conso_kwh * ges_values().gaz) / nb_habitants,
      metadata: { source: 'gaz', usage: 'all' },
      ecogeste: default_ecogeste
    })

  /**
   * Émissions totales.
   */
  ges.total = ges.items.reduce((sum, item) => sum + item.value, 0)

  return ges
}
