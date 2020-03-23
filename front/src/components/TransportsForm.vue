<template>
  <div>
    <v-btn color="primary" dark @click.stop="openForm(-1)"
      >Ajouter un trajet</v-btn
    >
    <v-dialog
      v-model="form_travel"
      max-width="550px"
      @click:outside="closeForm"
    >
      <travel-form @close="closeForm" :travel_id="travel_id"></travel-form>
    </v-dialog>

    <travel-card
      v-for="travel in travels"
      :travel="travel"
      :key="travel.id"
      @update-travel="openForm"
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
      form_travel: false,
      travel_id: -1
    }
  },
  computed: {
    ...mapState({
      travels: state => state.transports.travels
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

<style scoped>
div {
  margin: 10px;
}
</style>
