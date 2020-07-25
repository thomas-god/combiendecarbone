export interface ConsommationItem {
  name: string
  full_name: string
  value: number
}

export enum Categories {
  'Vêtements',
  'High-tech',
  'Électroménager'
}

export interface GesValues {
  total: number
  items: Record<string, number>
}

export interface store {
  items: Record<string, ConsommationItem[]>
  consommation: any
  ges: GesValues
}
