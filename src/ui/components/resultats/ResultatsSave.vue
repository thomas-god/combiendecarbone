<template>
  <v-btn @click="saveGes" color="primary">Sauvegarder</v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { TransportsState } from '@/ui/store/modules/transports';
import { AlimentationState } from '@/ui/store/modules/alimentation';
import { LogementState } from '@/ui/store/modules/logement';
import { ConsommationState } from '@/ui/store/modules/consommation';
import { ServicesState } from '@/ui/store/modules/services_publics';
import { GesTotalByCat } from '@/ui/store/modules/ges';

const transports_module = namespace('transports');
const logement_module = namespace('logement');
const alimentation_module = namespace('alimentation');
const consommation_module = namespace('consommation');
const services_module = namespace('services');
const ges_module = namespace('ges');

export interface GESFile {
  ges_version: string
  date: Date
  ges_total: number
  ges_total_by_cat: GesTotalByCat
  transports: TransportsState['travels']
  logement: LogementState['forms']
  alimentation: AlimentationState['regime']
  consommation: ConsommationState['consommation']
  services: ServicesState['items']
}

@Component
export default class ResultatsSave extends Vue {
  readonly version = '0.1.0'

  /**
   * Store items.
   */
  @transports_module.State travels!: TransportsState['travels']

  @logement_module.State forms!: LogementState['forms']

  @alimentation_module.State regime!: AlimentationState['regime']

  @consommation_module.State consommation!: ConsommationState['consommation']

  @services_module.State items!: ServicesState['items']

  @ges_module.Getter('gesTotal') ges_total!: number

  @ges_module.Getter('gesByCatTotal') ges_total_by_cat!: GesTotalByCat

  /**
   * Format and save methods.
   */
  saveGes(): void {
    this.saveBlob(this.formatGesObject());
  }

  formatGesObject(): GESFile {
    return {
      ges_version: this.version,
      date: new Date(),
      ges_total: this.ges_total,
      ges_total_by_cat: this.ges_total_by_cat,
      transports: this.travels,
      logement: this.forms,
      alimentation: this.regime,
      consommation: this.consommation,
      services: this.items,
    };
  }

  saveBlob(blob: any): void {
    const file = new Blob([JSON.stringify(blob)], { type: 'application/json' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    const date = new Date();
    a.href = url;
    a.download = `Bilan CO2 - ${date.getFullYear()}-${date.getMonth()
      + 1}-${date.getDate()}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
</script>

<style></style>
