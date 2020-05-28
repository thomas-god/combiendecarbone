const ges_values = {
  // kg CO2 eq./MWh
  gaz: 234,
  elec: 49.02
}

// Part des items électroménagers d'un foyer certifiés basse consommation
const equipements = {
  // Source: Bilan RTE 2016
  Aucun: 3.4,
  'Quelques-un': 1.3 + (3.4 - 1.3) * 0.75,
  'La plupart': 1.3 + (3.4 - 1.3) * 0.25,
  Tous: 1.3
}

const chauffage = {
  // Source: Bilan RTE 2016
  Électrique: 0.052 * 30, // kWhe/m^2 * m^2
  'Au gaz': 4.3 // https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html
}

const isolation = {
  // Source: Bilan RTE 2016
  Ancien: 1,
  Neuf: 0.25
}

function num(value) {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(factures) {
  let ges = { items: { Électricité: 0, Gaz: 0 }, total: 0 }
  ges.items['Électricité'] = num(factures.elec) * ges_values.elec
  ges.total += ges.items['Électricité']
  ges.items['Gaz'] = num(factures.gaz) * ges_values.gaz
  ges.total += ges.items['Gaz']
  return ges
}

function computeGesForm(form) {
  let ges = { items: { Électricité: 0, Gaz: 0 }, total: 0 }

  // Équipements
  ges.items['Électricité'] = equipements[form.equipements] * ges_values.elec

  // Chauffage
  if (form.chauffage === 'Au gaz') {
    ges.items['Gaz'] =
      chauffage[form.chauffage] * isolation[form.isolation] * ges_values.gaz
  } else {
    ges.items['Électricité'] +=
      chauffage[form.chauffage] * isolation[form.isolation] * ges_values.elec
  }

  // Total
  ges.total = ges.items['Électricité'] + ges.items['Gaz']
  return ges
}

function computeGes(consommation) {
  let ges = { items: {}, total: 0 }
  if (consommation.type === 'factures') {
    ges = computeGesFactures(consommation.factures)
  } else if (consommation.type === 'form') {
    ges = computeGesForm(consommation.form)
  }
  return ges
}

const logement = {
  equipements: Object.keys(equipements),
  chauffage: Object.keys(chauffage),
  isolation: Object.keys(isolation),
  computeGes
}

export { logement }
