/**
 * Compute the distance in km between departure and arrival places
 * when transportation mode is plane.
 * @returns {Object} {Distance in km, mode}
 */
function distancePlane(travel) {
  const dep = { lat: travel.departure.lat, lng: travel.departure.lng }
  const arr = { lat: travel.arrival.lat, lng: travel.arrival.lng }
  let distance = gcd(dep, arr)
  if (distance > 5500) {
    distance += 125
  } else if (distance > 550) {
    distance += 100
  } else {
    distance += 50
  }
  return Promise.resolve({ mode: travel.mode, distance: distance })
}

/**
 * Compute the Great Circle Distance in km between two points.
 * @param {Object} dep - Departure place {lat: latitude in degree, lng: longitude in degree}
 * @param {Object} arr - Arrival place {lat: latitude in degree, lng: longitude in degree}
 * @returns {Object} {Distance in km, mode}
 */
function gcd(dep, arr) {
  const R = 6371 // Earth radius, in km

  const lat1 = (dep.lat * Math.PI) / 180
  const lng1 = (dep.lng * Math.PI) / 180
  const lat2 = (arr.lat * Math.PI) / 180
  const lng2 = (arr.lng * Math.PI) / 180

  const dlat = Math.abs(lat1 - lat2)
  const dlng = Math.abs(lng1 - lng2)

  const dsigma =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2)
      )
    )
  return Math.round(dsigma * R)
}

/**
 * Returns a correctly formatted string for GMaps of latitude and longitude
 * @returns {String} latLng
 */
function getLatLng(place) {
  // No spaces for GMaps API
  return `${place.lat},${place.lng}`
}

/**
 * Compute the distance in km between departure and arrival places
 * when transportation mode is road (car, bus, coach, etc).
 * @returns {Object} {Distance in km, mode}
 */
function distanceDrive(travel) {
  // eslint-disable-next-line no-undef
  var direction_service = new google.maps.DirectionsService()
  return new Promise((resolve, reject) => {
    direction_service.route(
      {
        origin: getLatLng(travel.departure),
        destination: getLatLng(travel.arrival),
        travelMode: 'DRIVING'
      },
      (res, status) => {
        if (status !== 'OK') {
          reject(status)
        }
        if (res.routes.length > 0) {
          const distance = res.routes[0].legs[0].distance.value / 1000 // distance in km
          resolve({ mode: travel.mode, distance: distance })
        }
      }
    )
  })
}
/**
 * Compute the distance in km between departure and arrival places
 * when transportation mode is transit.
 * @returns {Array} Array of {distance, mode} for each step of the transit
 */
function distanceTransit(modes, travel) {
  // eslint-disable-next-line no-undef
  var direction_service = new google.maps.DirectionsService()
  var depDate = new Date()
  depDate.setHours(0)
  depDate.setMinutes(0)
  depDate.setSeconds(0)
  return new Promise((resolve, reject) => {
    direction_service.route(
      {
        origin: getLatLng(travel.departure),
        destination: getLatLng(travel.arrival),
        travelMode: 'TRANSIT',
        transitOptions: {
          departureTime: depDate,
          modes: modes,
          routingPreference: 'FEWER_TRANSFERS'
        }
      },
      (res, status) => {
        if (status !== 'OK') {
          reject(status)
        }
        if (res.routes.length > 0) {
          var distances = []
          res.routes[0].legs[0].steps.forEach(step => {
            if (step.travel_mode === 'TRANSIT') {
              distances.push({
                distance: step.distance.value / 1000,
                mode: step.transit.line.vehicle.type
              })
            }
          })
          resolve(distances)
        }
      }
    )
  })
}

async function computeDistance(travel) {
  let steps = []
  switch (travel.mode) {
    case 'Avion':
      steps.push(await distancePlane(travel))
      break
    case 'Voiture':
      steps.push(await distanceDrive(travel))
      break
    case 'TGV':
      steps = await distanceTransit(['TRAIN'], travel)
      break
    case 'Métro/Bus':
      steps = await distanceTransit(['BUS', 'RAIL'], travel)
      break
    default:
      console.log(`Cannot find function to compute ges for mode ${travel.mode}`)
  }
  console.log(steps)

  travel.distances = steps
  travel.distance = steps.reduce((sum, step) => sum + step.distance, 0)

  return travel
}

export { computeDistance }
