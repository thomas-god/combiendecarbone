import * as Alimentation from '@/types/alimentation'

const items: Alimentation.regimeItem[] = [
  { name: 'viande_rouge', text: 'Viande rouge' },
  { name: 'viande_blanche', text: 'Viande blanche' },
  { name: 'bio', text: 'Produits bios' },
  { name: 'local', text: 'Produits locaux' }
]

function computeGes(regime: Alimentation.userRegime): Alimentation.ges {
  // TODO: utiliser des valeurs cohérentes des ges
  const ges: Alimentation.ges = { items: {}, total: 0 }
  // Discount bio/local
  const discount: number =
    (1 - (0.0 * Alimentation.WeeklyFrequency[regime['bio']]) / 14) *
    (1 - (0.0 * Alimentation.WeeklyFrequency[regime['local']]) / 14)

  // Regime de base sur une semaine (14 repas) * 52 semaines
  ges.items['Alimentaire hors viande'] = 0.9 * 14 * 52 * discount

  // Contributions viande
  ges.items['Viande rouge'] =
    (6 - 0.9) *
    Alimentation.WeeklyFrequency[regime['viande_rouge']] *
    52 *
    discount
  ges.items['Viande blanche'] =
    (1.9 - 0.9) *
    Alimentation.WeeklyFrequency[regime['viande_blanche']] *
    52 *
    discount

  // Émissions annuelles en kg
  ges.total = Object.keys(ges.items).reduce((s, c) => s + ges.items[c], 0)
  return ges
}

const alimentation = {
  freq: Object.keys(Alimentation.WeeklyFrequency),
  items: items.map(r => {
    return { name: r.name, text: r.text }
  }),
  computeGes
}

export { alimentation }
