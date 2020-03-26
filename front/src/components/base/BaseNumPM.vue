<template>
  <div class="d-flex flex-row nowrap align-center">
    <v-btn
      :color="btnColor"
      @click="updateValue(-step)"
      class="pa-0"
      outlined
      fab
      small
    >
      <v-icon dark>mdi-minus</v-icon>
    </v-btn>
    <v-text-field
      ref="input"
      :label="label"
      class="mx-4 pa-0"
      :value="value"
      :rules="rules"
      @input="checkInput"
    ></v-text-field>
    <v-btn
      :color="btnColor"
      @click="updateValue(step)"
      class="pa-0"
      outlined
      fab
      small
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    btnColor: {
      type: String,
      default: 'success'
    },
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    },
    step: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rules: [
        value => (value === '' ? 'Valeur requise' : true),
        value =>
          isNaN(Number(value)) ? 'La valeur doit être un nombre' : true,
        value =>
          Number(value) > this.max ? `La valeur doit être ≤ ${this.max}` : true,
        value =>
          Number(value) < this.min ? `La valeur doit être ≥ ${this.min}` : true
      ]
    }
  },
  methods: {
    checkInput(new_value) {
      this.$nextTick().then(() => {
        if (this.$refs.input.errorBucket.length === 0) {
          this.$emit('input', Number(new_value))
        }
      })
    },
    updateValue(n) {
      let new_value = this.value + n
      if (new_value >= this.min && new_value <= this.max) {
        this.$emit('input', new_value)
      }
    }
  }
}
</script>

<style></style>
