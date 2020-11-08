<template>
  <v-card max-width="550px" class="mx-auto my-3">
    <!-- Card factures connues -->
    <div v-show="form.type === 'factures'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          Électricité:
          {{
            form.inputs.elec_conso_kwh === '' ? 0 : form.inputs.elec_conso_kwh
          }}
          kWh
        </p>
        <p>
          Gaz:
          {{ form.inputs.gaz_conso_kwh === '' ? 0 : form.inputs.gaz_conso_kwh }}
          kWh
        </p>
      </v-card-text>
    </div>

    <!-- Card formulaire -->
    <div v-show="form.type === 'estimations'">
      <v-card-title>
        Votre consommation
      </v-card-title>
      <v-card-text class="text-left">
        <p>Équipements basse consommation : {{ form.inputs.appliances }}</p>
        <p>Chauffage : {{ form.inputs.heating }}</p>
        <p>Niveau d'isolation : {{ form.inputs.isolation }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UserForm } from '@/plugins/ges_logement'

const logement_module = namespace('logement')

@Component
export default class LogementCard extends Vue {
  @logement_module.Getter forms!: UserForm[]

  form: UserForm = {
    id: 1,
    type: 'factures',
    inputs: {
      elec_offre_verte: true,
      gaz_offre_verte: true,
      gaz_conso_kwh: 100,
      elec_conso_kwh: 100
    }
  }
}
</script>

<style></style>
