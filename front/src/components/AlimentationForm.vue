<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center justify-center">
      <p>Vos habitudes alimentaires</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          v-for="item in items"
          :items="freq"
          :label="item.text"
          required
          :rules="rulesMode"
          :key="item.name"
          v-model="regime[item.name]"
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
      freq: 'alimentation/getFreq',
      items: 'alimentation/getItems'
    }),
    regime() {
      let regime = {}
      this.items.forEach(item => {
        regime[item.name] = ''
      })
      return regime
    }
  }
}
</script>

<style></style>
