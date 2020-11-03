import { GesCategory, Ecogeste } from '@/store/modules/ges'

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
  // Source: Bilan RTE 2016, en kWh
  Aucun = 3400,
  'Quelques-uns' = 1300 + (3400 - 1300) * 0.75,
  'La plupart' = 1300 + (3400 - 1300) * 0.25,
  Tous = 1300,
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
  // Consommations annuelles du chauffage en kWh pour un logement type (env. 30m2)
  Électrique = 52 * 30, // kWhe/m^2 * m^2 (Bilan RTE 2016)
  'Au gaz' = 4300, // https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
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

export interface Store {
  consommation: UserForm
  ges: GesCategory
  ecogeste?: Ecogeste
}

const ges_values: LogementFactures = {
  // kg CO2 eq./kWh
  gaz: 0.234,
  elec: 0.049
}

function num(value: number): number {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(factures: LogementFactures): GesCategory {
  const ges: GesCategory = { items: [], total: 0 }
  ges.items.push({
    name: 'Électricité',
    ges: num(factures.elec) * ges_values.elec,
    ecogeste: chooseEcogeste()
  })
  ges.items.push({
    name: 'Gaz',
    ges: num(factures.gaz) * ges_values.gaz,
    ecogeste: chooseEcogeste()
  })
  ges.total = ges.items.reduce((s, c) => s + c.ges, 0)
  return ges
}

function computeGesForm(form: LogementForm): GesCategory {
  const ges: GesCategory = { items: [], total: 0 }
  let elec = 0
  let gaz = 0

  // Équipements
  elec += Equipements[form.equipements] * ges_values.elec

  // Chauffage
  if (form.chauffage === 'Au gaz') {
    gaz +=
      Chauffage[form.chauffage] * Isolation[form.isolation] * ges_values.gaz
  } else {
    elec +=
      Chauffage[form.chauffage] * Isolation[form.isolation] * ges_values.elec
  }

  // Total
  ges.items.push({ name: 'Électricité', ges: elec, ecogeste: chooseEcogeste() })
  ges.items.push({ name: 'Gaz', ges: gaz, ecogeste: chooseEcogeste() })
  ges.total = ges.items.reduce((s, c) => s + c.ges, 0)
  return ges
}

function computeGes(consommation: UserForm): GesCategory {
  let ges: GesCategory = { items: [], total: 0 }
  if (consommation.type === 'factures' && consommation.factures) {
    ges = computeGesFactures(consommation.factures)
  } else if (consommation.type === 'form' && consommation.form) {
    ges = computeGesForm(consommation.form)
  }
  return ges
}

function chooseEcogeste(): Ecogeste {
  return { name: 'EcogesteLogement' }
}

export { computeGes }
