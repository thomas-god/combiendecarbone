<template>
  <category
    btn-name="Ajouter un trajet"
    @closing="updateCurrentId(-2)"
    @opening="resetForm"
  >
    <template v-slot:title>
      Vos déplacements
    </template>
    <template v-slot:text>
      <p>
        Pour estimer l'impact dû à vos déplacements, listez tous vos trajets
        effectués dans l'années, qu'ils soient occasionnels (week-end, vacances)
        ou réguliers (navette domicile-travail, activités hebdomadaires), et
        pour tous les modes de transports émetteurs (voiture, transports en
        commun, train, avion).
      </p>
    </template>

    <template v-slot:form="{ close }">
      <transports-form @close="close" ref="form" />
    </template>

    <template v-slot:card="{ touched, open }">
      <v-card-title v-show="nbTrajets > 0">Vos trajets</v-card-title>
      <transports-card
        v-for="travel in travelsReguliers"
        :travel="travel"
        :key="travel.id"
        @update-travel="updateTravel(open, travel.id)"
        v-show="nbTrajets > 0"
      />

      <transports-card
        v-for="travel in travelsOccasionnels"
        :travel="travel"
        :key="travel.id"
        @update-travel="updateTravel(open, travel.id)"
        v-show="nbTrajets > 0"
      />
    </template>
  </category>
</template>

<script lang="ts">
import Vue from 'vue'

import Category from '../base/Category.vue'
import TransportsForm from './TransportsForm.vue'
import TransportsCard from './TransportsCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
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
    }),
    nbTrajets(): number {
      return this.travelsReguliers.length + this.travelsOccasionnels.length
    }
  },
  methods: {
    ...mapActions({
      updateCurrentId: 'transports/updateCurrentId'
    }),
    updateTravel(open: () => void, travel_id: number): void {
      this.updateCurrentId(travel_id)
      open()
    },
    async resetForm(): Promise<void> {
      await this.$nextTick()
      const form = this.$refs.form as Vue & { resetForm: () => void }
      form.resetForm()
    }
  }
})
</script>

<style scoped></style>
