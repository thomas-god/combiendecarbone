<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center justify-center">
      <p>Vos habitudes alimentaires</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          v-for="item in items"
          :items="freqFiltered"
          :label="item.text"
          required
          :rules="rulesMode"
          :key="item.name"
          v-model="user_regime[item.name]"
        ></v-select>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { userRegime } from '../../plugins/alimentation_ges'

export default Vue.extend({
  data() {
    return {
      rulesMode: [(value: any) => !!value || 'Champs requis.'],
      user_regime: {
        bio: '',
        local: '',
        viande_rouge: '',
        viande_blanche: ''
      } as userRegime
    }
  },
  methods: {
    ...mapActions({
      setRegime: 'alimentation/setRegime'
    }),
    validate(): void {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.setRegime(this.user_regime)
        this.$emit('close')
      }
    },
    resetRegime(): void {
      this.user_regime = JSON.parse(JSON.stringify(this.regime)) as userRegime
      let form = this.$refs.form as Vue & { resetValidation: () => void }
      form.resetValidation()
    }
  },
  computed: {
    ...mapGetters({
      regime: 'alimentation/getRegime',
      freq: 'alimentation/getFreq',
      items: 'alimentation/getItems'
    }),
    freqFiltered(): string[] {
      return this.freq.filter((item: string) => item !== '')
    }
  }
})
</script>

<style></style>
