<template>
  <div>
    <h3>Trajets hebdomadaires</h3>
    <button class="form-input form-transport-add" @click="addTravel">Ajouter un trajet</button>
    <div class="travels-list">
      <travel v-for="id in travels" :key="id" :id="id" @delete-travel="removeTravel"></travel>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    travel: window.httpVueLoader("./scripts/components/Travel.vue")
  },
  data: function() {
    return {
      next_travel_id: 0,
      travels: []
    };
  },
  methods: {
    addTravel: function() {
      this.travels.push(this.next_travel_id);
      this.next_travel_id += 1;
    },
    removeTravel: function(travel_id) {
      const id = this.travels.indexOf(travel_id);
      if (id > -1) {
        this.travels.splice(id, 1);
      }
    }
  }
};
</script>

<style scoped>
.travel-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
