const freq = {
  Jamais: 0,
  '1-2 fois par semaine': 2,
  '1 fois par jour': 7,
  'A tous les repas': 14
}

const items = [
  { name: 'viande_rouge', text: 'Viande rouge', value: 0 },
  { name: 'viande_blanche', text: 'Viande blanche', value: 0 },
  //{ name: 'oeufs_fromage', text: 'Oeufs et produits laitiers', value: 0 },
  { name: 'bio', text: 'Produits bios', value: 0 },
  { name: 'local', text: 'Produits locaux', value: 0 }
]

function computeGes(regime) {
  // TODO: utiliser des valeurs cohérentes des ges
  let ges = { items: {}, total: 0 }
  // Discout bio/local
  let discount =
    (1 - (0.0 * freq[regime['bio']]) / 14) *
    (1 - (0.0 * freq[regime['local']]) / 14)

  // Regime de base sur une semaine (14 repas) * 52 semaines
  ges.items['Alimentaire hors viande'] = 0.9 * 14 * 52 * discount

  // Contributions viande
  ges.items['Viande rouge'] =
    (6 - 0.9) * freq[regime['viande_rouge']] * 52 * discount
  ges.items['Viande blanche'] =
    (1.9 - 0.9) * freq[regime['viande_blanche']] * 52 * discount

  // Émissions annuelles en kg
  ges.total = Object.keys(ges.items).reduce((s, c) => s + ges.items[c], 0)
  return ges
}

const alimentation = {
  freq: Object.keys(freq),
  items: items.map(r => {
    return { name: r.name, text: r.text }
  }),
  computeGes
}

export { alimentation }
