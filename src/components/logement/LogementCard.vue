<template>
  <v-card
    max-width="550px"
    class="mx-auto my-3"
    v-if="current_form !== undefined"
  >
    <!-- Card factures connues -->
    <div v-show="current_form.type === 'factures'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          Personnes dans votre foyer :
          {{
            current_form.inputs.nb_habitants === ''
              ? 1
              : current_form.inputs.nb_habitants
          }}
        </p>
        <p v-if="current_form.inputs.elec_conso_kwh > 0">
          Électricité:
          {{
            current_form.inputs.elec_conso_kwh === ''
              ? 0
              : current_form.inputs.elec_conso_kwh
          }}
          kWh
        </p>
        <p v-if="current_form.inputs.gaz_conso_kwh > 0">
          Gaz:
          {{
            current_form.inputs.gaz_conso_kwh === ''
              ? 0
              : current_form.inputs.gaz_conso_kwh
          }}
          kWh
        </p>
        <p v-if="current_form.inputs.fioul_conso_l > 0">
          Fioul:
          {{
            current_form.inputs.fioul_conso_l === ''
              ? 0
              : current_form.inputs.fioul_conso_l
          }}
          litres
        </p>
        <p v-if="current_form.inputs.bois_conso_stere > 0">
          Bois de chauffage:
          {{
            current_form.inputs.bois_conso_stere === ''
              ? 0
              : current_form.inputs.bois_conso_stere
          }}
          stères
        </p>
      </v-card-text>
    </div>

    <!-- Card formulaire -->
    <div v-show="current_form.type === 'estimation'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          Surface de votre logement :
          {{
            current_form.inputs.surface_m2 === ''
              ? 1
              : current_form.inputs.surface_m2
          }}
          m²
        </p>
        <p>
          Personnes dans votre foyer :
          {{
            current_form.inputs.nb_habitants === ''
              ? 1
              : current_form.inputs.nb_habitants
          }}
        </p>
        <p>
          Équipements basse consommation :
          {{ current_form.inputs.efficient_appliances_ratio }}
        </p>
        <p>Chauffage : {{ current_form.inputs.heating_source }}</p>
        <p>Niveau d'isolation : {{ current_form.inputs.isolation }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UserForm } from '@/plugins/ges_logement'

const logement_module = namespace('logement')

@Component
export default class LogementCard extends Vue {
  @Prop() form_id!: number
  @logement_module.Getter forms!: UserForm[]

  get current_form(): UserForm | undefined {
    return this.forms.find(f => f.id === this.form_id)
  }
}
</script>

<style></style>
