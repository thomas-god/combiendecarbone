<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center">
      <p>Vos habitudes alimentaires</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          v-for="r in regime_items"
          :items="labels"
          :label="r.text"
          required
          :rules="rulesMode"
          :key="r.name"
          v-model="regime[r.name]"
        ></v-select>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      rulesMode: [value => !!value || 'Champs requis.']
    }
  },
  methods: {
    ...mapActions({
      setRegime: 'alimentation/setRegime'
    }),
    validate() {
      if (this.$refs.form.validate()) {
        this.setRegime(this.regime)
        this.$emit('close')
      }
    }
  },
  computed: {
    ...mapGetters({
      labels: 'alimentation/getLabels',
      regime_items: 'alimentation/getRegimeItems'
    }),
    regime() {
      let regime = {}
      this.regime_items.forEach(r => {
        regime[r.name] = ''
      })
      return regime
    }
  }
}
</script>

<style></style>
