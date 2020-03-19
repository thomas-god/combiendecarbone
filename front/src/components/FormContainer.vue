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
import TransportsForm from './TransportsForm.vue'
import TransportsTravelCard from './TransportsTravelCard.vue'

export default {
  components: {
    'travel-form': TransportsForm,
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
