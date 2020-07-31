<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="align-self-start">
      {{ titles[category] }}
    </v-card-title>
    <v-card-actions>
      <v-form ref="form" class="d-flex flex-column mx-auto">
        <div class="d-flex flex-column align-stretch justify-center mx-auto">
          <num-btn
            v-for="item in consommation"
            :key="item.name"
            v-model="item.value"
            :label="$vuetify.breakpoint.xsOnly ? item.full_name : ''"
            :prefix="!$vuetify.breakpoint.xsOnly ? item.full_name + ': ' : ''"
            :min="0"
            class="my-4"
            max-width="280px"
          />
        </div>

        <v-btn @click="validate" color="success" class="ma-3">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseNumPM from '../base/BaseNumPM.vue'
import { mapGetters, mapActions } from 'vuex'
import { ConsommationItem } from '@/plugins/consommation_ges'

export default Vue.extend({
  components: {
    numBtn: BaseNumPM
  },
  props: ['category'],
  data() {
    return {
      items: [] as ConsommationItem[],
      consommation: [] as ConsommationItem[],
      active_items: [] as ConsommationItem[],
      remaining_items: [] as ConsommationItem[],
      titles: {
        Vêtements: 'Combien de vêtements achetez-vous tous les ans ?',
        Électroménager: "Combien d'années gardez-vous votre électroménager ?",
        'High-tech': "Combien d'années gardez-vous votre high-tech ?"
      } as Record<string, string>
    }
  },
  computed: {
    ...mapGetters({
      getConso: 'consommation/getConsoByCategory'
    }),
    remaining_items_sorted(): ConsommationItem[] {
      return this.remaining_items
        .concat()
        .sort((a: ConsommationItem, b: ConsommationItem) =>
          a.name > b.name ? 1 : -1
        )
    }
  },
  mounted() {
    this.resetForm()
  },
  watch: {
    category() {
      this.resetForm()
    }
  },
  methods: {
    ...mapActions({
      updateConso: 'consommation/updateConso'
    }),
    resetForm() {
      // Get list of items for current category
      this.consommation = JSON.parse(
        JSON.stringify(this.getConso(this.category))
      )

      /* let form = this.$refs.form as Vue & { resetValidation: () => void }
      form.resetValidation() */
    },
    validate() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.updateConso({ category: this.category, update: this.consommation })
        this.$emit('close')
      }
    }
  }
})
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
