<template>
  <div>
    <div class="modal-mask" v-show="display_popup">
      <div class="travel-form popup">
        <h3 class="popup-title">
          Nouveau trajet
          <button class="exit-button" @click="exitPopup">X</button>
        </h3>
        <div class="popup-form">
          <div class="popup-form-item">
            <label :for="getUniqueFormId('mode')">Mode de transport utilisé</label>
            <select v-model="inputs_copy.mode" :id="getUniqueFormId('mode')" class="default-input">
              <option v-for="mode in constants.modes" :value="mode" :key="mode">{{mode}}</option>
            </select>
          </div>

          <div class="popup-form-item">
            <label :for="getUniqueFormId('dep')">Lieu de départ</label>
            <input
              type="text"
              placeholder="Départ"
              :value="inputs_copy.departure"
              :id="getUniqueFormId('dep')"
              ref="departure"
              class="default-input"
            />
          </div>

          <div class="popup-form-item">
            <label :for="getUniqueFormId('arr')">Lieu d'arrivée</label>
            <input
              type="text"
              placeholder="Arrivée"
              :value="inputs_copy.arrival"
              :id="getUniqueFormId('arr')"
              ref="arrival"
              class="default-input"
            />
          </div>

          <div class="popup-form-item">
            <label :for="getUniqueFormId('ar')">
              Trajet aller/Retour
              <input
                type="checkbox"
                v-model="inputs_copy.ar"
                class="form-input form-transport-item-AR"
                :id="getUniqueFormId('ar')"
              />
            </label>
          </div>

          <div class="popup-form-item">
            <label :for="getUniqueFormId('freq')">Fréquence du trajet</label>
            <input
              type="number"
              v-model="inputs_copy.freq"
              min="1"
              step="1"
              :id="getUniqueFormId('freq')"
              ref="freq"
              class="default-input input-number"
            />
          </div>

          <div class="popup-form-item">
            <label
              v-show="inputs_copy.mode === 'Voiture'"
              :for="getUniqueFormId('passengers')"
            >Nombre de passagers</label>
            <input
              type="number"
              v-show="inputs_copy.mode === 'Voiture'"
              v-model="inputs_copy.passagers"
              min="1"
              step="1"
              :id="getUniqueFormId('passengers')"
              ref="passengers"
              class="default-input input-number"
            />
          </div>
          <div class="popup-form-item" ref="popup-errors">
            <ul v-show="errors.length > 0">
              <li v-for="error in errors" :key="error" class="error-msg">{{error}}</li>
            </ul>
          </div>
          <div class="popup-buttons">
            <button
              class="default-input button"
              @click="validateTravel"
            >{{ display_card ? "Modifier" : "Ajouter" }} le trajet</button>

            <button class="default-input button" @click="deleteTravel">Supprimer trajet</button>
          </div>
        </div>
      </div>
    </div>

    <div class="travel-card" v-show="display_card">
      <p class="travel-card-logo">{{ constants.modes_emoji[inputs.mode] }}</p>
      <div class="travel-card-title">
        <p>{{ inputs.departure.name }}</p>
        <hr />
        <p>{{ inputs.arrival.name }}</p>
      </div>

      <p class="travel-card-infos">3000km / 45 kg eq.CO2</p>

      <div class="travel-card-buttons">
        <button class="default-input button" @click="showPopup">Modifier</button>
        <button class="default-input button" @click="deleteTravel">Supprimer</button>
      </div>
    </div>
    <travel-ges :inputs="inputs"></travel-ges>
  </div>
</template>

<script>
const modes = ["Voiture", "Métro/Bus", "Vélo", "TGV", "Avion"];
const modes_emoji = {
  Voiture: "🚗",
  "Métro/Bus": "🚌",
  Vélo: "🚴",
  TGV: "🚄",
  Avion: "✈️"
};

module.exports = {
  props: ["id"],
  components: {
    "travel-ges": window.httpVueLoader("./scripts/components/TravelGes.vue")
  },
  data: function() {
    return {
      constants: {
        modes: modes,
        modes_emoji: modes_emoji
      },
      inputs: {
        mode: modes[0],
        departure: "",
        departure_placeholder: "",
        arrival: "",
        arrival_placeholder: "",
        ar: true,
        freq: 1,
        passagers: 1
      },
      inputs_copy: {},
      display_popup: true,
      display_card: false,
      errors: []
    };
  },
  mounted: function() {
    const places_dep = new google.maps.places.Autocomplete(
      this.$refs.departure
    );
    places_dep.setFields(["formatted_address", "name", "geometry"]);
    google.maps.event.addListener(places_dep, "place_changed", () => {
      this.inputs_copy.departure_place = places_dep.getPlace();
      this.inputs_copy.departure = this.$refs.departure.value;
    });

    const places_arr = new google.maps.places.Autocomplete(this.$refs.arrival);
    places_arr.setFields(["formatted_address", "name", "geometry"]);
    google.maps.event.addListener(places_arr, "place_changed", () => {
      this.inputs_copy.arrival_place = places_arr.getPlace();
      this.inputs_copy.arrival = this.$refs.arrival.value;
    });

    this.inputs_copy = this.getInputsCopy();
  },
  methods: {
    deleteTravel: function() {
      this.$emit("delete-travel", this.id);
    },
    validateTravel: function() {
      this.errors = [];

      if (this.display_card === false) {
        if (this.inputs_copy.departure_place === "") {
          this.errors.push("Veuillez sélectionner un lieu de départ.");
        }
        if (this.inputs_copy.arrival_place === "") {
          this.errors.push("Veuillez sélectionner un lieu d'arrivée.");
        }
      }

      if (this.inputs_copy.freq === "") {
        this.errors.push("La fréquence du trajet doit être plus grande que 0.");
      }
      if (this.inputs_copy.passagers === "") {
        this.errors.push("Le nombre de passagers doit être plus grand que 0.");
      }

      if (this.errors.length === 0) {
        this.display_popup = false;
        this.display_card = true;
        this.updateInputs();
      }
    },
    showPopup: function() {
      this.inputs_copy = this.getInputsCopy();
      this.display_popup = true;
    },
    exitPopup: function() {
      if (this.display_card === false) {
        this.deleteTravel();
      } else {
        this.display_popup = false;
      }
    },
    getUniqueFormId: function(str) {
      return "popup-form-" + this.id + "-" + str;
    },
    getInputsCopy: function() {
      return {
        mode: this.inputs.mode,
        departure: this.inputs.departure_placeholder,
        departure_place: "",
        arrival: this.inputs.arrival_placeholder,
        arrival_place: "",
        ar: this.inputs.ar,
        freq: this.inputs.freq,
        passagers: this.inputs.passagers
      };
    },
    updateInputs: function() {
      this.inputs.mode = this.inputs_copy.mode;
      this.inputs.ar = this.inputs_copy.ar;
      this.inputs.freq = this.inputs_copy.freq;
      this.inputs.passagers = this.inputs_copy.passagers;
      if (!(this.inputs_copy.departure_place === "")) {
        this.inputs.departure = this.inputs_copy.departure_place;
      }
      this.inputs.departure_placeholder = this.inputs_copy.departure;
      if (!(this.inputs_copy.arrival_place === "")) {
        this.inputs.arrival = this.inputs_copy.arrival_place;
      }
      this.inputs.arrival_placeholder = this.inputs_copy.arrival;
    }
  }
};
</script>

<style scoped>
.travel-form {
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem auto;
}

.modal-mask {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.1s ease;
  /* -webkit-overflow-scrolling: touch; */
}

.popup {
  width: 95%;
  height: 80vh;
  max-width: 500px;
  max-height: 520px;
  margin: 1rem auto;
  padding: 1rem 0rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.1s ease;
  display: flex;
  flex-flow: column nowrap;
}
.pac-container {
  z-index: 20;
}
.popup-title {
  align-self: center;
  text-align: center;
  margin: 0;
  width: 100%;
  position: relative;
}

.exit-button {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 5%;
  top: calc(50% - 0.5rem);
  box-sizing: border-box;
  border: none;
  background: none;
  font-size: 1rem;
  outline: none;
  color: grey;
}

.popup-form {
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem;
  align-self: stretch;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}

.popup-form-item {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1 0 auto;
  padding: 0.3rem 0;
  box-sizing: border-box;
}
.popup-form-item label {
  padding: 0.2rem;
}

.popup-buttons {
  flex: 1 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin: 1rem auto 0;
  width: 75%;
}

.popup-buttons .button {
  margin-bottom: 1rem;
}

.default-input {
  box-sizing: border-box;
  padding: 0.5em 0.7em;
  font-size: 1rem;
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: #f9f9f9;
}

.button {
}

.input-number {
  -moz-appearance: textfield;
}

.input-number::-webkit-inner-spin-button,
.input-number::-webkit-outer-spin-button {
  margin: 0;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  font-style: italic;
}

.travel-card {
  padding: 0.5rem;
  margin: 1rem auto;
  border-radius: 5px;
  border: 1px solid black;
  display: grid;
  width: 90%;
  max-width: 550px;
}

@media screen and (max-width: 525px) {
  .travel-card {
    grid-template-columns: 1fr;
    grid-template-areas:
      "logo"
      "title"
      "infos"
      "buttons";
  }
  .travel-card-logo {
    justify-self: center;
    margin: 0 0 5px;
  }
  .travel-card-title {
    padding: 10px 1rem;
  }
  .travel-card-infos {
    font-size: 0.9rem !important;
    justify-self: center;
    padding: 0 !important;
    margin: 5px 0 0 !important;
  }
  .travel-card-buttons {
    margin-top: 0.6rem;
    justify-self: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
  }
  .travel-card-buttons button {
  }
}

@media screen and (min-width: 525px) {
  .travel-card {
    grid-template-columns: auto 4fr auto;
    grid-template-areas:
      "logo title buttons"
      "logo infos buttons";
  }
  .travel-card-logo {
    margin: auto !important;
  }
  .travel-card-title {
    padding: 1.5rem 1rem 0;
  }
  .travel-card-infos {
    font-size: 0.9rem !important;
    justify-self: start;
    padding: 0 0 0 1.5rem !important;
    margin: 0 !important;
  }
  .travel-card-buttons {
    justify-content: center;
    grid-template-rows: 1fr 1fr;
    margin: 10px;
  }
}

.travel-card-logo {
  grid-area: logo;
  padding: 0;
  font-size: 1.5rem;
}
.travel-card-title {
  font-size: 1.2rem;
  grid-area: title;
}
.travel-card-title p {
  margin: 0;
  padding: 0;
}
.travel-card-title hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 2px 0;
  padding: 0;
}
.travel-card-infos {
  grid-area: infos;
  font-style: italic;
}
.travel-card-buttons {
  grid-area: buttons;
  display: grid;
  gap: 10px;
}
</style>