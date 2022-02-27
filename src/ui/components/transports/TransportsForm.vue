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
          :rules="rulesDeparture"
          placeholder=""
        ></v-text-field>

        <v-text-field
          label="Arrivée"
          id="arrival"
          clearable
          :rules="rulesArrival"
          :value="travel.arrival.placeholder"
          placeholder=""
        ></v-text-field>

        <v-text-field
          :label="frequenceTxt"
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
          {{ current_id === -1 ? 'Ajouter' : 'Modifier' }}
        </v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Travel } from '@/ui/plugins/transports_ges';

const transports_module = namespace('transports');

@Component
export default class TransportsForm extends Vue {
  @Prop({ default: false }) update_travel!: boolean

  /**
   * Transports store.
   */
  @transports_module.State travels!: Travel[]

  @transports_module.State current_id!: number

  @transports_module.Getter modes!: string[]

  @transports_module.Getter getTravelCopy!: (travel_id: number) => Travel

  @transports_module.Action insertTravel!: (travel: Travel) => Promise<number>

  @transports_module.Action updateTravel!: (travel: Travel) => Promise<number>

  @transports_module.Action deleteTravel!: (travel_id: number) => void

  @transports_module.Action updateCurrentId!: (new_id: number) => void

  /**
   * Travel object and validation rules.
   */
  travel = {
    type: '',
    mode: '',
    freq: 1,
    passengers: 1,
    ar: true,
    departure: {
      name: '',
      placeholder: '',
      lat: 0,
      lng: 0,
    },
    arrival: {
      name: '',
      placeholder: '',
      lat: 0,
      lng: 0,
    },
  } as Travel

  rulesMode = [(value: any) => !!value || 'Champs requis.']

  rulesPlace = [(value: any) => !!value || 'Champs requis.']

  rulesNum = [(value: any) => (value - 0 > 0 ? true : 'Doit être > 0.')]

  rulesDeparture = [
    (value: any) => !!value || 'Champs requis.',
    (value: string) => this.validateDeparture(value),
  ]

  rulesArrival = [
    (value: any) => !!value || 'Champs requis.',
    (value: string) => this.validateArrival(value),
  ]

  /**
   * Attach GMaps autocompletes on mounted.
   */
  mounted() {
    const input_dep = document.getElementById('departure') as HTMLInputElement;
    // eslint-disable-next-line no-undef
    const departure = new google.maps.places.Autocomplete(input_dep);
    departure.setFields(['formatted_address', 'name', 'geometry']);
    // eslint-disable-next-line no-undef
    departure.addListener('place_changed', () => {
      const place = departure.getPlace();
      if (place !== undefined && place.geometry !== undefined) {
        this.travel.departure.name = place.name;
        this.travel.departure.placeholder = input_dep.value;
        this.travel.departure.lat = place.geometry.location.lat();
        this.travel.departure.lng = place.geometry.location.lng();
      }
    });

    const input_arr = document.getElementById('arrival') as HTMLInputElement;
    // eslint-disable-next-line no-undef
    const arrival = new google.maps.places.Autocomplete(input_arr);
    arrival.setFields(['formatted_address', 'name', 'geometry']);
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(arrival, 'place_changed', () => {
      const place = arrival.getPlace();
      if (place !== undefined && place.geometry !== undefined) {
        this.travel.arrival.name = place.name;
        this.travel.arrival.placeholder = input_arr.value;
        this.travel.arrival.lat = place.geometry.location.lat();
        this.travel.arrival.lng = place.geometry.location.lng();
      }
    });
  }

  validateDeparture(value: string) {
    return value === this.travel.departure.placeholder
      ? true
      : 'Selectionner un lieu.';
  }

  validateArrival(value: string) {
    return value === this.travel.arrival.placeholder
      ? true
      : 'Selectionner un lieu.';
  }

  /**
   * Form related methods.
   */
  validate() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      let pr;
      if (this.current_id > -1) {
        pr = this.updateTravel(this.travel);
      } else {
        pr = this.insertTravel(this.travel);
      }
      pr.then(() => {
        this.updateCurrentId(-1);
        this.$emit('close');
      });
    }
  }

  resetForm() {
    // Reset form validation
    if (this.current_id === -1) {
      const form = this.$refs.form as Vue & { resetValidation: () => void };
      form.resetValidation();
    }
    // Initialisation of travel object
    let travel = {};
    if (this.current_id < 0) {
      travel = {
        type: '',
        mode: '',
        freq: 1,
        passengers: 1,
        ar: true,
        departure: {
          name: '',
          placeholder: '',
          lat: 0,
          lng: 0,
        },
        arrival: {
          name: '',
          placeholder: '',
          lat: 0,
          lng: 0,
        },
      };
    } else {
      travel = this.getTravelCopy(this.current_id);
    }
    // Avoid breaking Vue reactivity
    this.travel = { ...this.travel, ...travel };
  }

  @Watch('current_id')
  currentIdCallback() {
    this.resetForm();
  }

  /**
   * Misc computed properties.
   */
  get title() {
    let title = 'Ajouter un nouveau trajet';
    if (this.current_id > -1) {
      title = `Modifier le trajet #${this.current_id}`;
    }
    return title;
  }

  get frequenceTxt() {
    if (this.travel.type === 'Régulier') {
      return 'Fréquence du trajet hebdomadaire';
    } if (this.travel.type === 'Occasionnel') {
      return 'Fréquence du trajet annuelle';
    }
    return 'Fréquence du trajet';
  }
}
</script>

<style scoped></style>
