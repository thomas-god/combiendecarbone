<template>
  <div>
    <v-card dark>
      <v-card-title>Nouveau trajet</v-card-title>
      <v-card-actions class="d-flex flex-column align-stretch flex-sm-row">
        <v-select
          :items="modes"
          label="Mode de transport"
          v-model="mode"
        ></v-select>
        <v-text-field
          label="Départ"
          id="departure"
          :value="departure.placeholder"
          clearable
        ></v-text-field>
        <v-text-field
          label="Arrivée"
          id="arrival"
          clearable
          :value="arrival.placeholder"
        ></v-text-field>
        <v-text-field
          label="Fréquence du trajet"
          v-model="freq"
          type="number"
          min="1"
        ></v-text-field>
        <v-text-field
          label="Nombre de passagers"
          v-model="passengers"
          type="number"
          v-show="mode === 'Voiture'"
          min="1"
        ></v-text-field>
        <v-checkbox v-model="ar" label="Aller/retour"></v-checkbox>

        <v-btn @click="insertTravel(travel)">OK</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      mode: '',
      freq: 1,
      passengers: 1,
      ar: true,
      departure: {
        name: '',
        placeholder: '',
        lat: 0,
        long: 0
      },
      arrival: {
        name: '',
        placeholder: '',
        lat: 0,
        long: 0
      }
    }
  },
  mounted() {
    const input_dep = document.getElementById('departure')
    // eslint-disable-next-line no-undef
    var departure = new google.maps.places.Autocomplete(input_dep)
    departure.setFields(['formatted_address', 'name', 'geometry'])
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(departure, 'place_changed', () => {
      const place = departure.getPlace()
      this.departure = {
        name: place.name,
        placeholder: input_dep.value,
        lat: place.geometry.location.lat,
        long: place.geometry.location.lng
      }
    })

    const input_arr = document.getElementById('arrival')
    // eslint-disable-next-line no-undef
    var arrival = new google.maps.places.Autocomplete(input_arr)
    arrival.setFields(['formatted_address', 'name', 'geometry'])
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(arrival, 'place_changed', () => {
      const place = arrival.getPlace()
      this.arrival = {
        name: place.name,
        placeholder: input_arr.value,
        lat: place.geometry.location.lat,
        long: place.geometry.location.lng
      }
    })
  },
  computed: {
    ...mapState({
      travels: state => state.transports.travels,
      modes: state => state.transports.modes
    }),
    travel() {
      return {
        mode: this.mode,
        departure: this.departure,
        arrival: this.arrival,
        freq: this.freq,
        passengers: this.passengers,
        ar: this.ar
      }
    }
  },
  methods: mapActions('transports', ['insertTravel', 'deleteTravel'])
}
</script>

<style scoped>
div {
  margin: 10px;
}
</style>
