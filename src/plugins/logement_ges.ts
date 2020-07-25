import * as Logement from '@/types/logement'

const ges_values: Logement.LogementFactures = {
  // kg CO2 eq./MWh
  gaz: 234,
  elec: 49.02
}

function num(value: number): number {
  return isNaN(Number(value)) ? 0 : Number(value)
}

function computeGesFactures(
  factures: Logement.LogementFactures
): Logement.GesValues {
  const ges: Logement.GesValues = {
    items: { Électricité: 0, Gaz: 0 },
    total: 0
  }
  ges.items['Électricité'] = num(factures.elec) * ges_values.elec
  ges.total += ges.items['Électricité']
  ges.items['Gaz'] = num(factures.gaz) * ges_values.gaz
  ges.total += ges.items['Gaz']
  return ges
}

function computeGesForm(form: Logement.LogementForm): Logement.GesValues {
  const ges = { items: { Électricité: 0, Gaz: 0 }, total: 0 }

  // Équipements
  ges.items['Électricité'] =
    Logement.Equipements[form.equipements] * ges_values.elec

  // Chauffage
  if (form.chauffage === 'Au gaz') {
    ges.items['Gaz'] =
      Logement.Chauffage[form.chauffage] *
      Logement.Isolation[form.isolation] *
      ges_values.gaz
  } else {
    ges.items['Électricité'] +=
      Logement.Chauffage[form.chauffage] *
      Logement.Isolation[form.isolation] *
      ges_values.elec
  }

  // Total
  ges.total = ges.items['Électricité'] + ges.items['Gaz']
  return ges
}

function computeGes(consommation: Logement.UserForm): Logement.GesValues {
  let ges: Logement.GesValues = { items: {}, total: 0 }
  if (consommation.type === 'factures' && consommation.factures) {
    ges = computeGesFactures(consommation.factures)
  } else if (consommation.type === 'form' && consommation.form) {
    ges = computeGesForm(consommation.form)
  }
  return ges
}

export { computeGes }
