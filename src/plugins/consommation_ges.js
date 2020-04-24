const vetements = [
  { name: 'jeans', full_name: 'Jeans', ges: 25 },
  { name: 'tee-shirt', full_name: 'Tee-shirt', ges: 7 },
  { name: 'chemise', full_name: 'Chemise', ges: 13 },
  { name: 'pull-acrylique', full_name: 'Pull acrylique', ges: 28 },
  { name: 'pull-laine', full_name: 'Pull laine', ges: 56 },
  { name: 'sweat-coton', full_name: 'Sweat coton', ges: 31 },
  { name: 'robe', full_name: 'Robe', ges: 56 },
  { name: 'manteau', full_name: 'Manteau', ges: 89 },
  { name: 'chaussure', full_name: 'Chaussures', ges: 19 }
]
const high_tech = [
  { name: 'smartphone', full_name: 'Smartphone', ges: 30 },
  { name: 'portable', full_name: 'Ordinateur portable', ges: 156 },
  { name: 'fixe', full_name: 'Ordinateur fixe', ges: 200 },
  { name: 'tele', full_name: 'Télévision', ges: 350 }
]
const electromenager = [
  { name: 'four', full_name: 'Four', ges: 217 },
  { name: 'lave-vaisselle', full_name: 'Lave-vaisselle', ges: 253 },
  { name: 'lave-linge', full_name: 'Lave-linge', ges: 320 },
  { name: 'frigo', full_name: 'Réfrigérateur', ges: 257 }
]

function getItem(arr, item_name) {
  return arr.find(item => item.name === item_name).ges
}
function mul(a, b) {
  return a * b
}
function div(a, b) {
  return b === 0 ? 0 : a / b
}

function computeGesByCategory(category, conso, ges_values) {
  let ges = 0
  let op = category === 'Vêtements' ? mul : div
  for (let item in conso[category]) {
    ges += op(getItem(ges_values, item), conso[category][item])
  }
  return ges
}

function computeGes(consommation) {
  let ges = {
    Vêtements: computeGesByCategory('Vêtements', consommation, vetements),
    'High-tech': computeGesByCategory('High-tech', consommation, high_tech),
    Électroménager: computeGesByCategory(
      'Électroménager',
      consommation,
      electromenager
    )
  }
  ges.total = ges['Vêtements'] + ges['High-tech'] + ges['Électroménager']

  return ges
}

const consommation = {
  vetements: vetements.map(item => {
    return { name: item.name, full_name: item.full_name, value: 0 }
  }),
  high_tech: high_tech.map(item => {
    return { name: item.name, full_name: item.full_name, value: 0 }
  }),
  electromenager: electromenager.map(item => {
    return { name: item.name, full_name: item.full_name, value: 0 }
  }),
  computeGes: computeGes
}

export { consommation }
