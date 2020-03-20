<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center">
      <p class="ma-auto">Ajouter un nouveau trajet</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          :items="modes"
          label="Mode de transport"
          v-model="mode"
          required
          :rules="rulesMode"
        ></v-select>
        <v-text-field
          label="Départ"
          id="departure"
          :value="departure.placeholder"
          clearable
          :rules="rulesPlace"
        ></v-text-field>
        <v-text-field
          label="Arrivée"
          id="arrival"
          clearable
          :rules="rulesPlace"
          :value="arrival.placeholder"
        ></v-text-field>
        <v-text-field
          label="Fréquence du trajet"
          v-model="freq"
          type="number"
          min="1"
          :rules="rulesNum"
        ></v-text-field>
        <v-text-field
          label="Nombre de passagers"
          v-model="passengers"
          type="number"
          v-show="mode === 'Voiture'"
          min="1"
          :rules="rulesNum"
        ></v-text-field>
        <v-checkbox v-model="ar" label="Aller/retour"></v-checkbox>

        <v-btn @click="validate" color="success">Ajouter</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

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
      },
      rulesMode: [value => !!value || 'Champs requis.'],
      rulesPlace: [value => !!value || 'Champs requis.'],
      rulesNum: [value => (value - 0 > 0 ? true : 'Doit être > 0.')]
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
      travels: state => state.transports.travels
    }),
    ...mapGetters({
      modes: 'transports/getModesNames'
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
  methods: {
    ...mapActions('transports', ['insertTravel', 'deleteTravel']),
    validate() {
      if (this.$refs.form.validate()) {
        this.insertTravel(this.travel).then(() => {
          this.resetForm()
          this.$emit('close')
        })
      }
    },
    resetForm() {
      this.mode = ''
      this.freq = 1
      this.passengers = 1
      this.ar = true
      this.departure.name = ''
      this.departure.placeholder = ''
      this.departure.lat = 0
      this.departure.long = 0
      this.arrival.name = ''
      this.arrival.placeholder = ''
      this.arrival.lat = 0
      this.arrival.long = 0
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped></style>
