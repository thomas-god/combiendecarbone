import * as Consommation from '@/types/consommation'

const vetements_ges: Consommation.ConsommationItem[] = [
  { name: 'jeans', full_name: 'Jeans', value: 25 },
  { name: 'tee-shirt', full_name: 'Tee-shirt', value: 7 },
  { name: 'chemise', full_name: 'Chemise', value: 13 },
  { name: 'pull-acrylique', full_name: 'Pull acrylique', value: 28 },
  { name: 'pull-laine', full_name: 'Pull laine', value: 56 },
  { name: 'sweat-coton', full_name: 'Sweat coton', value: 31 },
  { name: 'robe', full_name: 'Robe', value: 56 },
  { name: 'manteau', full_name: 'Manteau', value: 89 },
  { name: 'chaussure', full_name: 'Chaussures', value: 19 }
]
const high_tech_ges: Consommation.ConsommationItem[] = [
  { name: 'smartphone', full_name: 'Smartphone', value: 30 },
  { name: 'portable', full_name: 'Ordinateur portable', value: 156 },
  { name: 'fixe', full_name: 'Ordinateur fixe', value: 200 },
  { name: 'tele', full_name: 'Télévision', value: 350 }
]
const electromenager_ges: Consommation.ConsommationItem[] = [
  { name: 'four', full_name: 'Four', value: 217 },
  { name: 'lave-vaisselle', full_name: 'Lave-vaisselle', value: 253 },
  { name: 'lave-linge', full_name: 'Lave-linge', value: 320 },
  { name: 'frigo', full_name: 'Réfrigérateur', value: 257 }
]

function getItem(
  arr: Consommation.ConsommationItem[],
  item_name: string
): number {
  const res = arr.find(item => item.name === item_name)
  return res ? res.value : 0
}
function mul(a: number, b: number): number {
  return a * b
}
function div(a: number, b: number): number {
  return b === 0 ? 0 : a / b
}

function computeGesByCategory(
  category: keyof typeof Consommation.Categories,
  consommation: Record<string, Consommation.ConsommationItem[]>,
  ges_values: Consommation.ConsommationItem[]
): number {
  let ges = 0
  const op = category === 'Vêtements' ? mul : div
  for (const item in consommation[category]) {
    ges += op(getItem(ges_values, item), consommation[category][item].value)
  }
  return ges
}

function computeGes(
  consommation: Record<string, Consommation.ConsommationItem[]>
): Consommation.GesValues {
  const ges: Consommation.GesValues = { total: 0, items: {} }
  ges.items = {
    Vêtements: computeGesByCategory('Vêtements', consommation, vetements_ges),
    'High-tech': computeGesByCategory('High-tech', consommation, high_tech_ges),
    Électroménager: computeGesByCategory(
      'Électroménager',
      consommation,
      electromenager_ges
    )
  }
  ges.total =
    ges.items['Vêtements'] +
    ges.items['High-tech'] +
    ges.items['Électroménager']

  return ges
}

const consommation: Record<string, Consommation.ConsommationItem[]> = {
  vetements: vetements_ges.map(
    (item: Consommation.ConsommationItem): Consommation.ConsommationItem => {
      return { name: item.name, full_name: item.full_name, value: 0 }
    }
  ),
  high_tech: high_tech_ges.map(item => {
    return { name: item.name, full_name: item.full_name, value: 0 }
  }),
  electromenager: electromenager_ges.map(item => {
    return { name: item.name, full_name: item.full_name, value: 0 }
  })
}

export { consommation, computeGes }
