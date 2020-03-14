<script>
module.exports = {
  props: ["inputs"],
  data: function() {
    return {
      modes_ges: {
        // From GMaps Directions API, gCO2/km
        RAIL: 8.9,
        METRO_RAIL: 5.7,
        SUBWAY: 5.7,
        TRAM: 6,
        MONORAIL: 6,
        HEAVY_RAIL: 3.6,
        COMMUTER_TRAIN: 8.9,
        HIGH_SPEED_TRAIN: 3.6,
        LONG_DISTANCE_TRAIN: 3.6,
        BUS: 95.6,
        INTERCITY_BUS: 154,
        TROLLEYBUS: 0,
        SHARE_TAXI: 0,
        FERRY: 0,
        CABLE_CAR: 0,
        GONDOLA_LIFT: 0,
        FUNICULAR: 0,
        OTHER: 0,
        // Non GMaps modes
        Voiture: 280.5,
        Avion: 249.6
      },
      steps: []
    };
  },
  render: function() {},
  mounted: function() {
    this.$watch(
      vm => (
        vm.inputs.departure, vm.inputs.arrival, vm.inputs.mode, Date.now()
      ),
      async function() {
        this.steps = [];
        switch (this.inputs.mode) {
          case "Avion":
            this.steps.push(await this.distancePlane());
            break;
          case "Voiture":
            this.steps.push(await this.distanceDrive());
            break;
          case "TGV":
            this.steps.push(await this.distanceTransit(["TRAIN"]));
            break;
          case "Métro/Bus":
            this.steps.push(await this.distanceTransit(["BUS", "RAIL"]));
            break;
          default:
            console.log(
              `Cannot find function to compute ges for mode ${this.travels.items[i].mode.value}`
            );
        }
      }
    );
  },
  computed: {
    distance: function() {
      console.log(this.steps);

      if (this.steps.length > 0) {
        return this.steps.reduce((sum, step) => sum + step.distance, 0);
      } else {
        return 0;
      }
    },
    ges: function() {
      if (this.steps.length > 0) {
        let sum = 0;
        for (let i = 0; i < this.steps.length; i++) {
          const step = this.steps[i];
          sum += (step.distance * this.modes_ges[step.mode]) / 1000;
        }
        return sum;
      } else {
        return 0;
      }
    }
  },
  methods: {
    /**
     * Compute the distance in km between departure and arrival places
     * when transportation mode is plane.
     * @returns {Object} {Distance in km, mode}
     */
    distancePlane() {
      const departure = {
        lat: this.inputs.departure.geometry.location.lat(),
        lng: this.inputs.departure.geometry.location.lng()
      };
      const arrival = {
        lat: this.inputs.arrival.geometry.location.lat(),
        lng: this.inputs.arrival.geometry.location.lng()
      };

      let distance = this.gcd(departure, arrival);
      if (distance > 5500) {
        distance += 125;
      } else if (distance > 550) {
        distance += 100;
      } else {
        distance += 50;
      }

      return Promise.resolve({ mode: this.inputs.mode, distance: distance });
    },
    /**
     * Compute the Great Circle Distance in km between two points.
     * @param {Object} dep - Departure place {lat: latitude in degree, lng: longitude in degree}
     * @param {Object} arr - Arrival place {lat: latitude in degree, lng: longitude in degree}
     * @returns {Object} {Distance in km, mode}
     */
    gcd: function(dep, arr) {
      const R = 6371; // Earth radius, in km

      const lat1 = (dep.lat * Math.PI) / 180;
      const lng1 = (dep.lng * Math.PI) / 180;
      const lat2 = (arr.lat * Math.PI) / 180;
      const lng2 = (arr.lng * Math.PI) / 180;

      const dlat = Math.abs(lat1 - lat2);
      const dlng = Math.abs(lng1 - lng2);

      const dsigma =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(dlat / 2), 2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2)
          )
        );
      return Math.round(dsigma * R);
    },
    /**
     * Returns a correctly formatted string for GMaps of latitude and longitude
     * @returns {String} latLng
     */
    getLatLng: function(place) {
      // No spaces for GMaps API
      return `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
    },
    /**
     * Compute the distance in km between departure and arrival places
     * when transportation mode is road (car, bus, coach, etc).
     * @returns {Object} {Distance in km, mode}
     */
    distanceDrive() {
      var direction_service = new google.maps.DirectionsService();
      return new Promise((resolve, reject) => {
        direction_service.route(
          {
            origin: this.getLatLng(this.inputs.departure),
            destination: this.getLatLng(this.inputs.arrival),
            travelMode: "DRIVING"
          },
          (res, status) => {
            if (res.routes.length > 0) {
              const distance = res.routes[0].legs[0].distance.value / 1000; // distance in km
              resolve({ mode: this.inputs.mode, distance: distance });
            }
          }
        );
      });
    },
    /**
     * Compute the distance in km between departure and arrival places
     * when transportation mode is transit.
     * @returns {Array} Array of {distance, mode} for each step of the transit
     */
    distanceTransit(modes) {
      var direction_service = new google.maps.DirectionsService();
      var depDate = new Date();
      depDate.setHours(0);
      depDate.setMinutes(0);
      depDate.setSeconds(0);
      return new Promise((resolve, reject) => {
        direction_service.route(
          {
            origin: this.getLatLng(this.inputs.departure),
            destination: this.getLatLng(this.inputs.arrival),
            travelMode: "TRANSIT",
            transitOptions: {
              departureTime: depDate,
              modes: modes,
              routingPreference: "FEWER_TRANSFERS"
            }
          },
          (res, status) => {
            if (res.routes.length > 0) {
              var distances = [];
              res.routes[0].legs[0].steps.forEach(step => {
                if (step.travel_mode === "TRANSIT") {
                  distances.push({
                    distance: step.distance.value / 1000,
                    mode: step.transit.line.vehicle.type
                  });
                }
              });
              resolve(distances);
            }
          }
        );
      });
    }
  }
};
</script>
