export interface Place {
  lat: number
  lng: number
}

export interface PlaceForm extends Place {
  name: string
  placeholder: string
}

export interface Travel {
  id: number
  name: string
  departure: PlaceForm
  arrival: PlaceForm
  mode: google.maps.TravelMode | google.maps.VehicleType | 'Voiture' | 'Avion'
  ar: boolean
  freq: number
  passengers: number
  type: 'Régulier' | 'Occasionnel'
  distance?: number
  distances?: Distance[]
  ges?: number
}

export interface Distance {
  distance: number
  mode: google.maps.TravelMode | google.maps.VehicleType | 'Voiture' | 'Avion'
}

export interface GesValues {
  total: number
  items: Record<string, number>
}

export interface Mode {
  name: string
  icon: string
}

export interface store {
  current_id: number
  ges: GesValues
  travels: Travel[]
  modes: Mode[]
}
