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
  Tous = 1.3
}

export enum Chauffage {
  // Source: Bilan RTE 2016
  Électrique = 0.052 * 30, // kWhe/m^2 * m^2
  'Au gaz' = 4.3 // https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
}

export enum Isolation {
  // Source: Bilan RTE 2016
  Ancien = 1,
  Neuf = 0.25
}

export interface store {
  consommation: UserForm
  ges: GesValues
}
