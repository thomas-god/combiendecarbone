export enum WeeklyFrequency {
  Jamais = 0,
  '1-2 fois par semaine' = 2,
  '1 fois par jour' = 7,
  'A tous les repas' = 14
}

export interface regimeItem {
  name: string
  text: string
}

export interface userRegime {
  bio: keyof typeof WeeklyFrequency
  local: keyof typeof WeeklyFrequency
  viande_rouge: keyof typeof WeeklyFrequency
  viande_blanche: keyof typeof WeeklyFrequency
}

export interface ges {
  total: number
  items: Record<string, number>
}
export interface store {
  freq: keyof typeof WeeklyFrequency
  items: regimeItem[]
  regime: userRegime
  ges: ges
}
