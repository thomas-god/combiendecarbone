import { GESCategory, Ecogeste } from '@/ui/store/modules/ges';

export interface Place {
  lat: number
  lng: number
}

export interface PlaceForm extends Place {
  name: string
  placeholder: string
}

export { GESCategory };

export interface Travel {
  id: number
  name: string
  departure: PlaceForm
  arrival: PlaceForm
  mode: string
  ar: boolean
  freq: number
  passengers: number
  type: 'Régulier' | 'Occasionnel' | ''
  distance?: number
  distances?: Distance[]
  ges?: number
  ecogeste?: Ecogeste
}

/**
 * Check if an object is compatible with the Travel interface.
 * @param travel Travel object to check.
 */
export function checkTravel(travel: Travel): boolean {
  /**
   * Name.
   */
  if (travel.name === undefined) return false;
  if (typeof travel.name !== 'string') return false;

  /**
   * Departure and arrival places.
   */
  if (!checkPlace(travel.departure)) return false;
  if (!checkPlace(travel.arrival)) return false;

  /**
   * Travel mode and type.
   */
  if (travel.mode === undefined) return false;
  if (typeof travel.mode !== 'string') return false;
  if (travel.type === undefined) return false;
  if (!['Régulier', 'Occasionnel'].includes(travel.type)) return false;

  /**
   * Roundabout trip.
   */
  if (travel.ar === undefined) return false;
  if (typeof travel.ar !== 'boolean') return false;

  /**
   * Passengers and frequency.
   */
  if (travel.passengers === undefined) return false;
  if (typeof travel.passengers !== 'number') return false;
  if (travel.freq === undefined) return false;
  if (typeof travel.freq !== 'number') return false;

  return true;
}

/**
 * Check if an object is compatible with the PlaceForm interface.
 * @param place Place object to check.
 */
export function checkPlace(place: PlaceForm): boolean {
  /**
   * Name and placeholder.
   */
  if (place.name === undefined) return false;
  if (typeof place.name !== 'string') return false;
  if (place.placeholder === undefined) return false;
  if (typeof place.placeholder !== 'string') return false;

  /**
   * Latitude and longitude.
   */
  if (place.lat === undefined) return false;
  if (typeof place.lat !== 'number') return false;
  if (place.lng === undefined) return false;
  if (typeof place.lng !== 'number') return false;

  return true;
}

export interface Distance {
  distance: number
  mode: string
}

export interface Mode {
  name: string
  icon: string
}

export interface Store {
  currentId: number
  ges: GESCategory
  travels: Travel[]
  modes: Mode[]
}

enum modes_ges {
  // From GMaps Directions API, gCO2/km
  RAIL = 8.9,
  METRO_RAIL = 5.7,
  SUBWAY = 5.7,
  TRAM = 6,
  MONORAIL = 6,
  HEAVY_RAIL = 3.6,
  COMMUTER_TRAIN = 8.9,
  HIGH_SPEED_TRAIN = 3.6,
  LONG_DISTANCE_TRAIN = 3.6,
  BUS = 95.6,
  INTERCITY_BUS = 154,
  TROLLEYBUS = 0,
  SHARE_TAXI = 0,
  FERRY = 0,
  CABLE_CAR = 0,
  GONDOLA_LIFT = 0,
  FUNICULAR = 0,
  OTHER = 0,
  // Non emitting modes
  BICYCLING = 0,
  DRIVING = 0,
  TRANSIT = 0,
  TWO_WHEELER = 0,
  WALKING = 0,
  // Non GMaps modes
  Voiture = 280.5,
  Avion = 249.6
}

/**
 * Compute total GES émissions of the travel.
 * @param travel Travel object.
 */
export function computeGes(travel: Travel): Travel {
  let ges = 0;
  if (travel.distances && travel.distances.length > 0) {
    for (let i = 0; i < travel.distances.length; i++) {
      const step = travel.distances[i];
      ges
        += (step.distance * modes_ges[step.mode as keyof typeof modes_ges]) / 1000;
    }
  }
  ges *= travel.ar ? 2 : 1;
  ges *= travel.freq;
  ges *= travel.mode === 'Voiture' ? 1 / travel.passengers : 1;
  ges *= travel.type === 'Régulier' ? 44 : 1;
  travel.ges = ges;
  travel.ecogeste = chooseEcogeste(travel);
  return travel;
}

/**
 * Choose the travel corresponding ecogeste.
 * @param travel Travel item
 */
function chooseEcogeste(travel: Travel): Ecogeste {
  const ecogeste: Ecogeste = { name: '' };

  if (travel.type === 'Régulier') {
    if (travel.mode === 'Voiture') {
      ecogeste.name = 'EcogesteTransportsRegulierVoiture';
    }
    if (travel.mode === 'Métro/Bus') {
      ecogeste.name = 'EcogesteTransportsRegulierTC';
    }
    if (travel.mode === 'Avion') {
      ecogeste.name = 'EcogesteTransportsRegulierAvion';
    }
    if (travel.mode === 'TGV') {
      ecogeste.name = 'EcogesteTransportsRegulierTGV';
    }
  } else if (travel.type === 'Occasionnel') {
    if (travel.mode === 'Voiture') {
      ecogeste.name = 'EcogesteTransportsOccasionnelVoiture';
    }
    if (travel.mode === 'Métro/Bus') {
      ecogeste.name = 'EcogesteTransportsOccasionnelTC';
    }
    if (travel.mode === 'Avion') {
      ecogeste.name = 'EcogesteTransportsOccasionnelAvion';
    }
    if (travel.mode === 'TGV') {
      ecogeste.name = 'EcogesteTransportsOccasionnelTGV';
    }
  }

  return ecogeste;
}
