export type Category = 'Transports' | 'Alimentation' | 'Logement' | 'Consommation'

export interface GESItem {
  category: Category
  label: string
  value: number
}

export interface ComponentEcogeste {
  name: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  props?: any
}
