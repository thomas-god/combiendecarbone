<template>
  <v-card class="pa-3 ma-0">
    <v-card-title class="mb-0 pb-0 align-self-center">
      <p>Votre consommation {{ current_form.type }}</p>
    </v-card-title>
    <v-card-actions class="d-flex flex-column align-stretch">
      <v-form ref="form">
        <v-select
          :items="[
            { text: 'Oui', value: 'factures' },
            { text: 'Non', value: 'estimation' }
          ]"
          label="Je connais mes factures d'énergie"
          v-model="current_form.type"
          required
          :rules="rulesReq"
          @input="toggleFormType"
        ></v-select>

        <!-- Factures connues -->
        <div v-if="current_form.type === 'factures'">
          <v-text-field
            label="Facture d'éléctricité (kWh)"
            v-model.number="current_form.inputs.elec_conso_kwh"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
          <v-text-field
            label="Facture de gaz (kWh)"
            v-model.number="current_form.inputs.gaz_conso_kwh"
            type="number"
            min="0"
            step="0.05"
            :rules="rulesNum"
          ></v-text-field>
          <v-text-field
            label="Nombre de personnes dans votre foyer (vous inclus·e)"
            v-model.number="current_form.inputs.nb_habitants"
            type="number"
            min="1"
            step="1"
            :rules="rulesNumSup1"
          ></v-text-field>
        </div>

        <!-- Factures non connues -->
        <div v-if="current_form.type === 'estimation'">
          <v-text-field
            label="Surface de votre logement (m²)"
            v-model.number="current_form.inputs.surface_m2"
            type="number"
            min="1"
            step="1"
            :rules="rulesNumSup1"
          ></v-text-field>
          <v-text-field
            label="Nombre de personnes dans votre foyer (vous inclus·e)"
            v-model.number="current_form.inputs.nb_habitants"
            type="number"
            min="1"
            step="1"
            :rules="rulesNumSup1"
          ></v-text-field>
          <v-select
            label="Vos appareils basse consommation (classe A ou supérieure)"
            :items="appliances_options"
            required
            :rules="rulesReq"
            v-model="current_form.inputs.efficient_appliances_ratio"
          ></v-select>
          <v-select
            label="Vous avez un chauffage"
            :items="heating_options"
            required
            :rules="rulesReq"
            v-model="current_form.inputs.heating_source"
          ></v-select>
          <v-select
            label="Votre niveau d'isolation"
            :items="isolation_options"
            required
            :rules="rulesReq"
            v-model="current_form.inputs.isolation"
          ></v-select>
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="validate" color="success">Ok</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UserForm } from '../../plugins/ges_logement'

const logement_module = namespace('logement')

@Component
export default class LogementForm extends Vue {
  @Prop({ default: -1 }) form_id!: number
  @logement_module.Getter default_forms!: UserForm[]
  @logement_module.Getter forms!: UserForm[]
  @logement_module.Getter appliances_options!: string[]
  @logement_module.Getter heating_options!: string[]
  @logement_module.Getter isolation_options!: string[]

  /**
   * Current form.
   */
  base_form = {
    id: -1,
    type: '',
    inputs: {}
  }
  current_form: UserForm = this.base_form as UserForm

  @Watch('form_id')
  selectForm(): void {
    const id = this.forms.findIndex(f => f.id === this.form_id)
    if (id > -1) {
      this.current_form = deepCopy(this.forms[id])
    } else {
      this.current_form = deepCopy(this.base_form)
    }
  }
  toggleFormType(new_type: string): void {
    const new_form = this.default_forms.find(f => f.type === new_type)
    if (new_form !== undefined) {
      this.current_form.type = new_form.type
      this.current_form.inputs = deepCopy(new_form.inputs)
    }
  }

  /**
   * Validation rules.
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
  rulesReq = [(value: any) => !!value || 'Champs requis.']
  rulesNum = [
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    (value: any) => (value !== '' ? true : 'Doit être un nombre.'),
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    (value: any) => (value >= 0 ? true : 'Doit être positif.')
  ]
  rulesNumSup1 = [
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    (value: any) => (value !== '' ? true : 'Doit être un nombre.'),
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    (value: any) => (value >= 1 ? true : 'Doit être plus grand que 1.')
  ]

  /**
   * Form related methods.
   */
  @logement_module.Action updateForm!: (form: UserForm) => void
  validate(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.updateForm(this.current_form)
      this.$emit('close')
    }
  }
  resetForm(): void {
    this.selectForm()
    const form = this.$refs.form as Vue & { resetValidation: () => void }
    form.resetValidation()
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style></style>
