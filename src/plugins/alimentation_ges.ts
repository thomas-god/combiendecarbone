export enum WeeklyFrequency {
  Jamais,
  '1-2 fois par semaine',
  '1 fois par jour',
  'A tous les repas',
  ''
}

export type weekFreq = keyof typeof WeeklyFrequency

export interface regimeItem {
  name: string
  text: string
}

export interface userRegime {
  bio: weekFreq
  local: weekFreq
  viande_rouge: weekFreq
  viande_blanche: weekFreq
}

export interface ges {
  total: number
  items: Record<string, number>
}
export interface store {
  freq: weekFreq[]
  regimes: regimeItem[]
  regime: userRegime
  ges: ges
}

const freq: Record<weekFreq, number> = {
  Jamais: 0,
  '1-2 fois par semaine': 2,
  '1 fois par jour': 7,
  'A tous les repas': 14,
  '': 0
}

const regimes: regimeItem[] = [
  { name: 'viande_rouge', text: 'Viande rouge' },
  { name: 'viande_blanche', text: 'Viande blanche' },
  { name: 'bio', text: 'Produits bios' },
  { name: 'local', text: 'Produits locaux' }
]

function computeGes(regime: userRegime): ges {
  // TODO: utiliser des valeurs cohérentes des ges
  const ges: ges = { items: {}, total: 0 }
  // Discount bio/local
  const discount: number =
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
  freq: Object.keys(freq) as weekFreq[],
  regimes,
  computeGes
}

export { alimentation }
