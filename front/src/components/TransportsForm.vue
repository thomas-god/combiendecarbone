<template>
  <div>
    <travel-form></travel-form>

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
    return {}
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
