<template>
  <category>
    <template v-slot:title>
      Votre consommation d'énergie
    </template>
    <template v-slot:text>
      <p>
        Pour calculer l'impact de votre logement (chauffage, eau chaude
        sanitaire, appareils électriques, etc.) nous avons besoin de connaître
        vos consommation <em>annuelles</em> d'électricité et/ou de gaz, que vous
        pouvez trouver sur vos factures. Si vous ne les connaissez pas nous
        utiliserons une valeur moyenne à l'échelle de la population française.
      </p>
    </template>

    <template v-slot:form="{ close }">
      <logement-form @close="close"></logement-form>
    </template>

    <template v-slot:card>
      <v-card max-width="550px" class="mx-auto my-3">
        <v-card-title v-show="factures.flag === 'Oui'">
          Votre consommation
        </v-card-title>
        <v-card-text class="text-left" v-show="factures.flag === 'Oui'">
          <p>Électricité: {{ factures.elec === '' ? 0 : factures.elec }} MWh</p>
          <p>Gaz: {{ factures.gaz === '' ? 0 : factures.gaz }} MWh</p>
        </v-card-text>
      </v-card>
    </template>
  </category>
</template>

<script>
import { mapActions } from 'vuex'
import Category from './base/Category.vue'
import LogementForm from './LogementForm.vue'

export default {
  components: {
    LogementForm,
    Category
  },
  data() {
    return {
      form: false,
      form_touched: false
    }
  },
  computed: {
    factures: {
      get() {
        return this.$store.state.logement.factures
      },
      set(value) {
        mapActions('logement/updateFactures', value)
      }
    }
  },
  methods: {
    closeForm() {
      this.form = false
      this.form_touched = true
    }
  }
}
</script>

<style></style>
