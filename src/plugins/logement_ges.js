const ges_values = {
  gaz: 234,
  elec: 49.02
}

function num(value) {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(factures) {
  let ges = 0
  if (factures.flag === 'Oui') {
    ges += num(factures.elec) * ges_values.elec
    ges += num(factures.gaz) * ges_values.gaz
  }
  return ges
}

function computeGes(logement) {
  let ges = { total: 0 }
  if (logement.factures !== undefined) {
    ges.factures = computeGesFactures(logement.factures)
    ges.total += ges.factures
  }
  return ges
}
export { computeGes }
