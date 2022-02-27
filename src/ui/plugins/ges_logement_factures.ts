import {
  GESCategoryLogement,
  ges_values,
  default_ecogeste,
} from './ges_logement';

export interface LogementFormFactures {
  bois_conso_stere: number
  bois_offre_verte: boolean
  elec_conso_kwh: number
  elec_offre_verte: boolean
  gaz_conso_kwh: number
  gaz_offre_verte: boolean
  fioul_conso_l: number
  nb_habitants: number
}

export const default_form: LogementFormFactures = {
  bois_conso_stere: 0,
  bois_offre_verte: false,
  elec_conso_kwh: 0,
  elec_offre_verte: false,
  gaz_conso_kwh: 0,
  gaz_offre_verte: false,
  fioul_conso_l: 0,
  nb_habitants: 1,
};

/**
 * Specific conversion factors for fioul and bois.
 */
export const fioul_kgCO2_per_l = 3.19;
export const bois_kgC02_per_stere = 57;

/**
 * Check if an object is compatible with the LogementFormFactures
 * interface.
 * @param form Form object to check.
 */
export function checkForm(form: LogementFormFactures): boolean {
  if (form.elec_conso_kwh === undefined) return false;
  if (typeof form.elec_conso_kwh !== 'number') return false;

  if (form.elec_offre_verte === undefined) return false;
  if (typeof form.elec_offre_verte !== 'boolean') return false;

  if (form.gaz_conso_kwh === undefined) return false;
  if (typeof form.gaz_conso_kwh !== 'number') return false;

  if (form.gaz_offre_verte === undefined) return false;
  if (typeof form.gaz_offre_verte !== 'boolean') return false;

  if (form.nb_habitants === undefined) return false;
  if (typeof form.nb_habitants !== 'number') return false;
  return true;
}

/**
 * Compute GES for a LogementFormFactures form.
 * @param factures Form object.
 */
export function computeGes(
  factures: LogementFormFactures,
): GESCategoryLogement {
  const ges: GESCategoryLogement = {
    items: [],
    total: 0,
  };

  const nb_habitants = factures.nb_habitants > 0 ? factures.nb_habitants : 1;

  /**
   * Facture d'électricité.
   */
  if (factures.elec_conso_kwh > 0) {
    ges.items.push({
      category: 'Logement',
      label: 'Electricité',
      value: (factures.elec_conso_kwh * ges_values().elec) / nb_habitants,
      metadata: { source: 'elec', usage: 'all' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Facture de gaz.
   */
  if (factures.gaz_conso_kwh > 0) {
    ges.items.push({
      category: 'Logement',
      label: 'Gaz',
      value: (factures.gaz_conso_kwh * ges_values().gaz) / nb_habitants,
      metadata: { source: 'gaz', usage: 'heating' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Facture de bois.
   */
  if (factures.bois_conso_stere > 0) {
    ges.items.push({
      category: 'Logement',
      label: 'Bois',
      value: (factures.bois_conso_stere * bois_kgC02_per_stere) / nb_habitants,
      metadata: { source: 'bois', usage: 'heating' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Facture de fioul.
   */
  if (factures.fioul_conso_l > 0) {
    ges.items.push({
      category: 'Logement',
      label: 'Fioul',
      value: (factures.fioul_conso_l * fioul_kgCO2_per_l) / nb_habitants,
      metadata: { source: 'fioul', usage: 'heating' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Émissions totales.
   */
  ges.total = ges.items.reduce((sum, item) => sum + item.value, 0);

  return ges;
}
