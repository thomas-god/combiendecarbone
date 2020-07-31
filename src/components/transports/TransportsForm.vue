<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center">
      <p class="ma-auto">{{ title }}</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          :items="['Régulier', 'Occasionnel']"
          label="Type de trajet"
          v-model="travel.type"
          required
          :rules="rulesMode"
        ></v-select>

        <v-select
          :items="modes"
          label="Mode de transport"
          v-model="travel.mode"
          required
          :rules="rulesMode"
        ></v-select>

        <v-text-field
          label="Départ"
          id="departure"
          :value="travel.departure.placeholder"
          ref="departure"
          clearable
          :rules="rulesPlace"
          placeholder=""
        ></v-text-field>

        <v-text-field
          label="Arrivée"
          id="arrival"
          clearable
          :rules="rulesPlace"
          :value="travel.arrival.placeholder"
          placeholder=""
        ></v-text-field>

        <v-text-field
          label="Fréquence du trajet"
          v-model="travel.freq"
          type="number"
          min="1"
          :rules="rulesNum"
        ></v-text-field>

        <v-text-field
          label="Nombre de passagers"
          v-model="travel.passengers"
          type="number"
          v-show="travel.mode === 'Voiture'"
          min="1"
          :rules="rulesNum"
        ></v-text-field>

        <v-checkbox v-model="travel.ar" label="Aller/retour"></v-checkbox>

        <v-btn @click="validate" color="success">
          {{ travel_id === -1 ? 'Ajouter' : 'Modifier' }}
        </v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

import { Travel } from '@/plugins/transports_ges'

export default Vue.extend({
  props: {
    update_travel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      travel: {
        id: -1,
        name: '',
        type: '',
        mode: '',
        freq: 1,
        passengers: 1,
        ar: true,
        departure: {
          name: '',
          placeholder: '',
          lat: 0,
          lng: 0
        },
        arrival: {
          name: '',
          placeholder: '',
          lat: 0,
          lng: 0
        }
      } as Travel,
      rulesMode: [(value: any) => !!value || 'Champs requis.'],
      rulesPlace: [(value: any) => !!value || 'Champs requis.'],
      rulesNum: [(value: any) => (value - 0 > 0 ? true : 'Doit être > 0.')]
    }
  },
  mounted() {
    const input_dep = document.getElementById('departure') as HTMLInputElement
    // eslint-disable-next-line no-undef
    var departure = new google.maps.places.Autocomplete(input_dep)
    departure.setFields(['formatted_address', 'name', 'geometry'])
    // eslint-disable-next-line no-undef
    departure.addListener('place_changed', () => {
      const place = departure.getPlace()
      if (place && place.geometry) {
        this.travel.departure = {
          name: place.name,
          placeholder: input_dep.value + '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      }
    })

    const input_arr = document.getElementById('arrival') as HTMLInputElement
    // eslint-disable-next-line no-undef
    var arrival = new google.maps.places.Autocomplete(input_arr)
    arrival.setFields(['formatted_address', 'name', 'geometry'])
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(arrival, 'place_changed', () => {
      const place = arrival.getPlace()
      if (place && place.geometry) {
        this.travel.arrival = {
          name: place.name,
          placeholder: input_arr.value,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      }
    })
  },
  watch: {
    travel_id: function() {
      this.resetForm()
    }
  },
  computed: {
    ...mapState({
      travels: (state: any) => state.transports.travels,
      travel_id: (state: any) => state.transports.current_id
    }),
    ...mapGetters({
      modes: 'transports/getModesNames',
      getTravelCopy: 'transports/getTravelCopy'
    }),
    title() {
      let title = 'Ajouter un nouveau trajet'
      if (this.travel_id > -1) {
        title = `Modifier le trajet #${this.travel_id}`
      }
      return title
    }
  },
  methods: {
    ...mapActions('transports', [
      'insertTravel',
      'updateTravel',
      'deleteTravel',
      'updateCurrentId'
    ]),
    validate() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        let pr
        if (this.travel_id > -1) {
          pr = this.updateTravel(this.travel)
        } else {
          pr = this.insertTravel(this.travel)
        }
        pr.then(() => {
          this.updateCurrentId(-2)
          this.$emit('close')
        })
      }
    },
    resetForm() {
      // Reset form validation
      if (this.travel_id === -2) {
        let form = this.$refs.form as Vue & { resetValidation: () => void }
        form.resetValidation()
      }

      // Initialisation of travel object
      let travel = {}
      if (this.travel_id < 0) {
        travel = {
          id: -1,
          type: '',
          mode: '',
          freq: 1,
          passengers: 1,
          ar: true,
          departure: {
            name: '',
            placeholder: '',
            lat: 0,
            lng: 0
          },
          arrival: {
            name: '',
            placeholder: '',
            lat: 0,
            lng: 0
          }
        }
      } else {
        travel = this.getTravelCopy(this.travel_id)
      }
      // Avoid breaking Vue reactivity
      this.travel = Object.assign({}, this.travel, travel)
    }
  }
})
</script>

<style scoped></style>
