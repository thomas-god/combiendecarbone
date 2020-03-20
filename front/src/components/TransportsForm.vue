<template>
  <div>
    <v-dialog v-model="form_travel" max-width="550px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Ajouter un trajet</v-btn>
      </template>
      <travel-form @close="form_travel = false"></travel-form>
    </v-dialog>

    <travel-card
      v-for="travel in travels"
      :travel="travel"
      :key="travel.id"
    ></travel-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransportsTravelForm from './TransportsTravelForm.vue'
import TransportsTravelCard from './TransportsTravelCard.vue'

export default {
  components: {
    'travel-form': TransportsTravelForm,
    'travel-card': TransportsTravelCard
  },
  data() {
    return {
      form_travel: false
    }
  },
  computed: {
    ...mapState({
      travels: state => state.transports.travels
    })
  }
}
</script>

<style scoped>
div {
  margin: 10px;
}
</style>
