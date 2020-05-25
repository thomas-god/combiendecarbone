const ges_values = {
  gaz: 234,
  elec: 49.02
}

function num(value) {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(factures) {
  let ges = { items: {}, total: 0 }
  if (factures.flag === 'Oui') {
    ges.items['Électricité'] = num(factures.elec) * ges_values.elec
    ges.total += ges.items['Électricité']
    ges.items['Gaz'] = num(factures.gaz) * ges_values.gaz
    ges.total += ges.items['Gaz']
  }
  return ges
}

function computeGes(logement) {
  let ges = { items: {}, total: 0 }
  if (logement.factures !== undefined) {
    ges = computeGesFactures(logement.factures)
  }
  return ges
}
export { computeGes }
