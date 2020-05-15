<template>
  <category
    :btn-name="{ dirty: 'Ajouter un trajet', clean: 'Ajouter un trajet' }"
    @closing="updateCurrentId(-2)"
  >
    <template v-slot:text>
      <h2 class="mb-4 text-center">Vos déplacements</h2>
      <p>
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
    </template>

    <template v-slot:form="{ close }">
      <transports-form @close="close"></transports-form>
    </template>

    <template v-slot:card="{ touched, open }">
      <v-card-title v-show="touched">Vos trajets</v-card-title>
      <transports-card
        v-for="travel in travelsReguliers"
        :travel="travel"
        :key="travel.id"
        @update-travel="open"
        v-show="touched"
      />

      <transports-card
        v-for="travel in travelsOccasionnels"
        :travel="travel"
        :key="travel.id"
        @update-travel="open"
        v-show="touched"
      />
    </template>
  </category>

  <!--   <v-btn color="primary" dark @click.stop="openForm(-1)"
      >Ajouter un trajet</v-btn
    > -->
</template>

<script>
import Category from './base/Category.vue'
import TransportsForm from './TransportsForm.vue'
import TransportsCard from './TransportsCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TransportsForm,
    TransportsCard,
    Category
  },
  data() {
    return {
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
    ...mapActions({
      updateCurrentId: 'transports/updateCurrentId'
    })
  }
}
</script>

<style scoped></style>
