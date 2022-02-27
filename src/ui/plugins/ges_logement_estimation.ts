import {
  GESCategoryLogement,
  ges_values,
  default_ecogeste,
} from '@/ui/plugins/ges_logement';

export interface LogementFormEstimation {
  efficient_appliances_ratio: string
  heating_source: string
  isolation: string
  elec_offre_verte: boolean
  gaz_offre_verte: boolean
  nb_habitants: number
  surface_m2: number
}

export const default_form: LogementFormEstimation = {
  efficient_appliances_ratio: '',
  heating_source: '',
  isolation: '',
  elec_offre_verte: false,
  gaz_offre_verte: false,
  nb_habitants: 1,
  surface_m2: 30,
};

/**
 * Check if an object is compatible with the LogementFormEstimation
 * interface.
 * @param form Form object to check.
 */
export function checkForm(form: LogementFormEstimation): boolean {
  if (form.efficient_appliances_ratio === undefined) return false;
  if (typeof form.efficient_appliances_ratio !== 'string') return false;

  if (form.heating_source === undefined) return false;
  if (typeof form.heating_source !== 'string') return false;

  if (form.isolation === undefined) return false;
  if (typeof form.isolation !== 'string') return false;

  if (form.elec_offre_verte === undefined) return false;
  if (typeof form.elec_offre_verte !== 'boolean') return false;

  if (form.gaz_offre_verte === undefined) return false;
  if (typeof form.gaz_offre_verte !== 'boolean') return false;

  if (form.nb_habitants === undefined) return false;
  if (typeof form.nb_habitants !== 'number') return false;

  if (form.surface_m2 === undefined) return false;
  if (typeof form.surface_m2 !== 'number') return false;
  return true;
}

/**
 * Part des équipements électroménagers basse consommation d'un foyer.
 * Valeur annuelle en kWh, d'après Bilan RTE 2016.
 */
const appliances: { label: string; value: number; source: string }[] = [
  {
    label: 'Aucun',
    value: (1300 + (3400 - 1300) * 1) * ges_values().elec,
    source: 'elec',
  },
  {
    label: 'Quelques-uns',
    value: (1300 + (3400 - 1300) * 0.75) * ges_values().elec,
    source: 'elec',
  },
  {
    label: 'La plupart',
    value: (1300 + (3400 - 1300) * 0.25) * ges_values().elec,
    source: 'elec',
  },
  {
    label: 'Tous',
    value: (1300 + (3400 - 1300) * 0) * ges_values().elec,
    source: 'elec',
  },
];
export const appliances_options: string[] = appliances.map((r) => r.label);

/**
 * Consommations annuelles du chauffage en kWh/m2, adapté d'un logement type (env. 30m2)
 */
const heating = [
  {
    label: 'Électrique',
    value: 52 * ges_values().elec, // Bilan RTE 2016
    source: 'elec',
  },
  {
    label: 'Au gaz',
    value: (4300 / 30) * ges_values().gaz, // https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
    source: 'gaz',
  },
] as const;
export const heating_options: string[] = heating.map((r) => r.label);

/**
 * Isolation du logement.
 */
const isolation = [
  {
    label: 'Ancien',
    value: 1,
  },
  {
    label: 'Neuf',
    value: 0.25,
  },
] as const;
export const isolation_options: string[] = isolation.map((r) => r.label);

/**
 * Calcule les émissions de GES.
 * @param form User's inputs.
 */
export function computeGes(form: LogementFormEstimation): GESCategoryLogement {
  const ges: GESCategoryLogement = {
    items: [],
    total: 0,
  };

  /**
   * Consommation des équipements.
   */
  const item_appliances = appliances.find(
    (item) => item.label === form.efficient_appliances_ratio,
  );
  if (item_appliances) {
    ges.items.push({
      category: 'Logement',
      label: 'Équipements (électricité)',
      value: item_appliances.value,
      metadata: { source: item_appliances.source, usage: 'appliances' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Chauffage.
   */
  const nb_habitants = form.nb_habitants > 0 ? form.nb_habitants : 1;
  const surface_m2 = form.surface_m2 >= 1 ? form.surface_m2 : 30;
  const item_heating = heating.find((item) => item.label === form.heating_source);
  const item_isolation = isolation.find((item) => item.label === form.isolation);
  if (item_heating) {
    ges.items.push({
      category: 'Logement',
      label: `Chauffage - (${item_heating.label})`,
      value:
        (surface_m2
          * item_heating.value
          * (item_isolation === undefined ? 1 : item_isolation.value))
        / nb_habitants,
      metadata: { source: item_heating.source, usage: 'heating' },
      ecogeste: default_ecogeste,
    });
  }

  /**
   * Émissions totales.
   */
  ges.total = ges.items.reduce((sum, item) => sum + item.value, 0);

  return ges;
}
