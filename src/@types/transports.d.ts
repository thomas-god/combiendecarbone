declare namespace Transports {
  interface Place {
    lat: number
    lng: number
  }

  interface PlaceForm extends Place {
    name: string
    placeholder: string
  }

  interface Travel {
    id: number
    name: string
    departure: Place | PlaceForm
    arrival: Place | PlaceForm
    mode: google.maps.TravelMode | google.maps.VehicleType | 'Voiture' | 'Avion'
    ar: boolean
    freq: number
    passengers: number
    type: 'Régulier' | 'Occasionnel'
    distance?: number
    distances?: Distance[]
    ges?: number
  }

  interface Distance {
    distance: number
    mode: google.maps.TravelMode | google.maps.VehicleType | 'Voiture' | 'Avion'
  }

  interface GesValues {
    total: number
    items: Record<string, number>
  }

  interface Mode {
    name: string
    icon: string
  }

  interface store {
    current_id: number
    ges: GesValues
    travels: Travel[]
    modes: Mode[]
  }
}
