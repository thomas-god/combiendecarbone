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
      <logement-card />
    </template>
  </category>
</template>

<script>
import Category from './base/Category.vue'
import LogementForm from './LogementForm.vue'
import logementCard from './LogementCard.vue'

export default {
  components: {
    LogementForm,
    logementCard,
    Category
  },
  data() {
    return {
      form: false,
      form_touched: false
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
