declare namespace Consommation {
  interface ConsommationItem {
    name: string
    full_name: string
    value: number
  }

  enum Categories {
    'Vêtements',
    'High-tech',
    'Électroménager'
  }

  interface GesValues {
    total: number
    items: Record<string, number>
  }

  interface store {
    items: Record<string, ConsommationItem[]>
    consommation: any
    ges: GesValues
  }
}
