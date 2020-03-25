<template>
  <v-card class="mx-auto my-3 pa-3" max-width="650px">
    <v-card-text class="text-justify">
      <slot name="text">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          est exercitationem repudiandae ab harum libero atque, ratione,
          provident eos iure laboriosam, commodi reprehenderit veritatis nostrum
          minima quibusdam sint dolores. Laboriosam.
        </p>
      </slot>
    </v-card-text>
    <v-btn color="primary" dark @click="form = true">
      {{ form_touched ? btn_name.dirty : btn_name.clean }}
    </v-btn>
    <v-dialog
      v-model="form"
      max-width="550px"
      @click:outside="form = false"
      class="ma-0"
    >
      <slot name="form" :close="closeForm">
        <v-form></v-form>
      </slot>
    </v-dialog>
    <slot name="card" :touched="form_touched">
      <v-card>
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
    btn_name: {
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
    closeForm() {
      this.form = false
      this.form_touched = true
    }
  }
}
</script>

<style></style>
