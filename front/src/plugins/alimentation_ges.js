const freq = {
  Jamais: 0,
  '1-2 fois par semaine': 2,
  '1 fois par jour': 7,
  'A tous les repas': 14
}

const items = [
  { name: 'viande_rouge', text: 'Viande rouge', value: 0 },
  { name: 'viande_blanche', text: 'Viande blanche', value: 0 },
  { name: 'oeufs_fromage', text: 'Oeufs et produits laitiers', value: 0 },
  { name: 'bio', text: 'Produits bios', value: 0 },
  { name: 'local', text: 'Produits locaux', value: 0 }
]

function computeGes(regime) {
  // Regime de base
  let ges = 300 * 14

  // Contribution viande
  ges += freq[regime['viande_rouge']] * 1600
  ges += freq[regime['viande_blanche']] * 800
  ges += freq[regime['oeufs_fromage']] * 500

  // Réductions bio et local
  ges *= (freq[regime['bio']] / 14) * (1 - 0.02)
  ges *= (freq[regime['local']] / 14) * (1 - 0.1)

  // Émissions annuelles en kg
  return (ges * 52) / 1000
}

const alimentation = {
  freq: Object.keys(freq),
  items: items.map(r => {
    return { name: r.name, text: r.text }
  }),
  computeGes
}

export { alimentation }
