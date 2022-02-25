import { GESCategory, Ecogeste } from '@/ui/store/modules/ges'

export enum WeeklyFrequency {
  Jamais,
  '1-2 fois par semaine',
  '1 fois par jour',
  'A tous les repas',
  ''
}

export type weekFreq = keyof typeof WeeklyFrequency

export interface RegimeItem {
  name: string
  text: string
}

export interface UserRegime {
  bio: weekFreq
  local: weekFreq
  viande_rouge: weekFreq
  viande_blanche: weekFreq
}

/**
 * Check if an object is compatible to the UserRegime
 * interface.
 * @param regime Regime object to check.
 */
export function checkRegime(regime: UserRegime): boolean {
  if (regime.bio === undefined) return false
  if (regime.local === undefined) return false
  if (regime.viande_rouge === undefined) return false
  if (regime.viande_blanche === undefined) return false
  return true
}

export interface Store {
  freq: weekFreq[]
  regimes: RegimeItem[]
  regime: UserRegime
  ges: GESCategory
}

const freq: Record<weekFreq, number> = {
  Jamais: 0,
  '1-2 fois par semaine': 2,
  '1 fois par jour': 7,
  'A tous les repas': 14,
  '': 0
}

export const regimes: RegimeItem[] = [
  { name: 'viande_rouge', text: 'Viande rouge' },
  { name: 'viande_blanche', text: 'Viande blanche' },
  { name: 'bio', text: 'Produits bios' },
  { name: 'local', text: 'Produits locaux' }
]

export function computeGes(regime: UserRegime): GESCategory {
  // TODO: utiliser des valeurs cohérentes des ges
  const ecogeste = chooseEcogeste(regime)
  const ges: GESCategory = { items: [], total: 0 }
  if (!checkRegimeHasEmptyField(regime)) {
    // Discount bio/local
    const discount: number =
      (1 - (0.0 * freq[regime['bio']]) / 14) *
      (1 - (0.0 * freq[regime['local']]) / 14)

    // Regime de base sur une semaine (14 repas) * 52 semaines
    ges.items.push({
      category: 'Alimentation',
      label: 'Alimentaire hors viande',
      value: 0.9 * 14 * 52 * discount,
      ecogeste: ecogeste
    })

    // Contributions viande
    ges.items.push({
      category: 'Alimentation',
      label: 'Viande rouge',
      value: (6 - 0.9) * freq[regime['viande_rouge']] * 52 * discount,
      ecogeste: ecogeste
    })
    ges.items.push({
      category: 'Alimentation',
      label: 'Viande blanche',
      value: (1.9 - 0.9) * freq[regime['viande_blanche']] * 52 * discount,
      ecogeste: ecogeste
    })

    // Émissions annuelles en kg
    ges.total = ges.items.reduce((s, c) => s + c.value, 0)
  }
  return ges
}

function checkRegimeHasEmptyField(regime: UserRegime): boolean {
  return (
    regime.bio === '' ||
    regime.local === '' ||
    regime.viande_blanche === '' ||
    regime.viande_rouge === ''
  )
}

function chooseEcogeste(regime: UserRegime): Ecogeste {
  const freqs: Record<string, number> = {
    rouge: freq[regime.viande_rouge],
    blanche: freq[regime.viande_blanche],
    bio: freq[regime.bio],
    local: freq[regime.local]
  }
  let palier = -1
  if (freqs.rouge >= 2) {
    // Palier de base (défaut)
    palier = 1
  }
  if (freqs.rouge === 0 && freqs.blanche > 2) {
    // Pas de viande rouge mais encore de la viande blanche
    palier = 2
  }
  if (freqs.rouge === 0 && freqs.blanche <= 2) {
    // Pas de viande rouge et viande blanche minimale
    palier = 3
  }
  if (freqs.rouge === 0 && freqs.blanche === 0) {
    // Plus de viande, ni rouge ni blanche
    palier = 4
  }
  if (
    freqs.rouge === 0 &&
    freqs.blanche === 0 &&
    freqs.bio + freqs.local > 10
  ) {
    // Plus de viande et un peu de local/bio
    palier = 5
  }
  if (
    freqs.rouge === 0 &&
    freqs.blanche === 0 &&
    freqs.bio + freqs.local > 20
  ) {
    // Plus de viande et full local/bio
    palier = 6
  }
  return { name: 'EcogesteAlimentation', props: { palier: palier } }
}

const alimentation = {
  freq: Object.keys(freq) as weekFreq[],
  regimes,
  computeGes
}

export const item_freq = Object.keys(freq) as weekFreq[]

export { alimentation }
