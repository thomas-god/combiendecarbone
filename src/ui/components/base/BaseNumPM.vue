<template>
  <div class="d-flex flex-row nowrap align-center">
    <v-text-field
      ref="input"
      :label="label"
      :prefix="prefix"
      class="mx-4 pa-0"
      :value="localValue"
      :rules="rules"
      @input.native.stop="checkInput"
    ></v-text-field>

    <v-btn
      :color="btnColor"
      @click.native.capture="e => updateValue(-step)"
      class="pa-0 mx-1"
      outlined
      fab
      x-small
      ref="minus"
    >
      <v-icon dark>mdi-minus</v-icon>
    </v-btn>
    <v-btn
      :color="btnColor"
      @click.native.stop="e => updateValue(step)"
      class="pa-0 mx-1"
      outlined
      fab
      x-small
      ref="plus"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    btnColor: {
      type: String,
      default: 'success'
    },
    value: {
      //type: Number,
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
      required: false
    },
    prefix: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      rules: [
        (value: any) => (value === '' ? 'Valeur requise' : true),
        (value: any) =>
          isNaN(Number(value)) ? 'La valeur doit être un nombre' : true,
        (value: any) =>
          Number(value) > this.max ? `La valeur doit être ≤ ${this.max}` : true,
        (value: any) =>
          Number(value) < this.min ? `La valeur doit être ≥ ${this.min}` : true
      ]
    }
  },
  computed: {
    localValue: {
      get(): number {
        return this.value as number
      },
      set(new_value: number) {
        this.$emit('input', new_value)
      }
    }
  },
  methods: {
    checkInput(event: { target: { value: number } }): void {
      const new_value = event.target.value
      this.$nextTick().then(() => {
        if (
          (this.$refs.input as Vue & { errorBucket: [] }).errorBucket.length ===
          0
        ) {
          this.localValue = Number(new_value)
        }
      })
    },
    updateValue(n: number): void {
      const new_value = (this.value as number) + n
      if (new_value >= this.min && new_value <= this.max) {
        this.localValue = new_value
      }
    }
  }
})
</script>

<style></style>
