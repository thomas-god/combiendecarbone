export interface GesValues {
  total: number
  items: Record<string, number>
}

export interface LogementFactures {
  gaz: number
  elec: number
}

export interface LogementForm {
  isolation: keyof typeof Isolation | ''
  equipements: keyof typeof Equipements | ''
  chauffage: keyof typeof Chauffage | ''
}

export interface UserForm {
  type: 'factures' | 'form' | ''
  form: LogementForm
  factures: LogementFactures
}
// Part des items électroménagers d'un foyer certifiés basse consommation
export enum Equipements {
  // Source: Bilan RTE 2016, en MWh
  Aucun = 3.4,
  'Quelques-uns' = 1.3 + (3.4 - 1.3) * 0.75,
  'La plupart' = 1.3 + (3.4 - 1.3) * 0.25,
  Tous = 1.3,
  '' = 0
}

export const EquipementsKeys: Array<keyof typeof Equipements> = [
  'Aucun',
  'Quelques-uns',
  'La plupart',
  'Tous',
  ''
]

export enum Chauffage {
  // Source: Bilan RTE 2016
  Électrique = 0.052 * 30, // kWhe/m^2 * m^2
  'Au gaz' = 4.3, // https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
  '' = 0
}

export const ChauffageKeys: Array<keyof typeof Chauffage> = [
  'Électrique',
  'Au gaz',
  ''
]

export enum Isolation {
  // Source: Bilan RTE 2016
  Ancien = 1,
  Neuf = 0.25,
  '' = 0
}

export const IsolationKeys: Array<keyof typeof Isolation> = [
  'Ancien',
  'Neuf',
  ''
]

export interface store {
  consommation: UserForm
  ges: GesValues
}

const ges_values: LogementFactures = {
  // kg CO2 eq./MWh
  gaz: 234,
  elec: 49.02
}

function num(value: number): number {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(factures: LogementFactures): GesValues {
  const ges: GesValues = {
    items: { Électricité: 0, Gaz: 0 },
    total: 0
  }
  ges.items['Électricité'] = num(factures.elec) * ges_values.elec
  ges.total += ges.items['Électricité']
  ges.items['Gaz'] = num(factures.gaz) * ges_values.gaz
  ges.total += ges.items['Gaz']
  return ges
}

function computeGesForm(form: LogementForm): GesValues {
  const ges = { items: { Électricité: 0, Gaz: 0 }, total: 0 }

  // Équipements
  ges.items['Électricité'] = Equipements[form.equipements] * ges_values.elec

  // Chauffage
  if (form.chauffage === 'Au gaz') {
    ges.items['Gaz'] =
      Chauffage[form.chauffage] * Isolation[form.isolation] * ges_values.gaz
  } else {
    ges.items['Électricité'] +=
      Chauffage[form.chauffage] * Isolation[form.isolation] * ges_values.elec
  }

  // Total
  ges.total = ges.items['Électricité'] + ges.items['Gaz']
  return ges
}

function computeGes(consommation: UserForm): GesValues {
  let ges: GesValues = { items: {}, total: 0 }
  if (consommation.type === 'factures' && consommation.factures) {
    ges = computeGesFactures(consommation.factures)
  } else if (consommation.type === 'form' && consommation.form) {
    ges = computeGesForm(consommation.form)
  }
  return ges
}

export { computeGes }
