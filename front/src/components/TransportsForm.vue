<template>
  <v-card class="mx-auto my-3 pa-3" max-width="650px">
    <v-card-text class="text-justify"
      ><p>
        Le secteur des transports est à l'origine d'environ
        <a
          href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf#page=38"
          target="_blank"
          >29%</a
        >
        des émissions de gaz à effet de serre en France, dont la moitié pour les
        véhicules particuliers. Ces émissions peuvent être directes (lors de la
        combustion d'essence dans une voiture) ou indirectes (lors de la
        production d'électricité pour faire rouler un train). Pour un trajet la
        quantité de gaz à effet de serre émise va dépendre du
        <strong>mode utilisé</strong> (voiture, vélo, train, etc.) et de la
        <strong>distance parcourue</strong>.
      </p>
      <p>
        Nous avons découpé vos trajets 2 catégories : vos trajets
        <strong>réguliers hebdomadaires</strong>, et vos trajets
        <strong>occasionnels</strong> (lors de vos vacances par exemple).
      </p>
      <p>
        Pour les deux catégories vous pouvez ajouter vos trajets via le bouton
        <em>Ajouter un trajet</em> puis préciser le mode de transport utilisé,
        les lieux de départ et d'arrivée, si c'est un aller retour et la
        fréquence de ce trajet (dans la semaine pour les trajets hebdomadaires
        ou dans l'année pour les trajets occasionnels).
      </p>
    </v-card-text>

    <v-btn color="primary" dark @click.stop="openForm(-1)"
      >Ajouter un trajet</v-btn
    >
    <v-dialog
      v-model="form_travel"
      max-width="550px"
      @click:outside="closeForm"
      class="ma-0"
    >
      <travel-form @close="closeForm" :travel_id="travel_id"></travel-form>
    </v-dialog>

    <v-card-title>Trajets hebdomadaires</v-card-title>
    <travel-card
      v-for="travel in travelsReguliers"
      :travel="travel"
      :key="travel.id"
      @update-travel="openForm"
    ></travel-card>

    <v-card-title>Trajets occasionnels</v-card-title>
    <travel-card
      v-for="travel in travelsOccasionnels"
      :travel="travel"
      :key="travel.id"
      @update-travel="openForm"
    ></travel-card>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TransportsTravelForm from './TransportsTravelForm.vue'
import TransportsTravelCard from './TransportsTravelCard.vue'

export default {
  components: {
    'travel-form': TransportsTravelForm,
    'travel-card': TransportsTravelCard
  },
  data() {
    return {
      form_travel: false,
      travel_id: -1
    }
  },
  computed: {
    ...mapGetters({
      travelsReguliers: 'transports/getTravelsReguliers',
      travelsOccasionnels: 'transports/getTravelsOccasionnels'
    })
  },
  methods: {
    openForm(id) {
      this.travel_id = id
      this.form_travel = true
    },
    closeForm() {
      this.form_travel = false
      this.travel_id = -2
    }
  }
}
</script>

<style scoped></style>
