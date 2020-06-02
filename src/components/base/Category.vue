<template>
  <v-card class="mx-auto my-0 pa-3 pb-6" max-width="700px">
    <h2 class="pt-1">
      <slot name="title">
        Titre par défaut
      </slot>
    </h2>

    <v-card-text class="text-justify" color="black">
      <slot name="text">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          est exercitationem repudiandae ab harum libero atque, ratione,
          provident eos iure laboriosam, commodi reprehenderit veritatis nostrum
          minima quibusdam sint dolores. Laboriosam.
        </p>
      </slot>
    </v-card-text>

    <slot name="btn" :open="openForm" :touched="form_touched">
      <v-btn color="primary" dark @click="openForm">
        {{ form_touched ? btnName.dirty : btnName.clean }}
      </v-btn>
    </slot>

    <v-dialog
      v-model="form"
      max-width="550px"
      @click:outside="closeFormUntouched"
      class="ma-0"
    >
      <slot name="form" :close="closeForm">
        <v-form></v-form>
      </slot>
    </v-dialog>
    <slot name="card" :touched="form_touched" :open="openForm">
      <v-card v-show="form_touched">
        <v-card-title>Titre de la carte</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, ea
          molestiae alias impedit aspernatur eaque, voluptates fuga et quod
          architecto eos nulla totam sed, fugiat eius laudantium nostrum
          provident nemo.
        </v-card-text>
      </v-card>
    </slot>
  </v-card>
</template>

<script>
export default {
  props: {
    btnName: {
      type: Object,
      default() {
        return {
          dirty: 'Modifier',
          clean: 'Remplir'
        }
      }
    }
  },
  data() {
    return {
      form: false,
      form_touched: false
    }
  },
  methods: {
    openForm() {
      this.form = true
      this.$emit('opening')
    },
    closeForm() {
      this.$emit('closing')
      this.form = false
      this.form_touched = true
    },
    closeFormUntouched() {
      this.$emit('closing')
      this.form = false
    }
  }
}
</script>

<style></style>
