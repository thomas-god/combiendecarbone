<template>
  <category>
    <template v-slot:title>
      Votre alimentation
    </template>
    <template v-slot:text>
      <p>
        Le secteur de l'agriculture est à l'origine d'environ
        <a
          href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf"
          target="_blank"
          >16%</a
        >
        des émissions de gaz à effet de serre en France, principalement via le
        méthane émis par les animaux d'élevage, et les engrais azotés. Les
        émissions de gaz à effet de serre variant d'un aliment à un autre, un
        moyen efficace d'estimer nos émissions dues à notre alimentation est de
        raisonner en terme de régimes alimentaires.
      </p>
      <p>
        Trois régimes alimentaires ont été retenus suivant leur teneur en
        protéines animales et végétales :
      </p>
      <ul>
        <li>
          le régime <strong>omnivore</strong>, ou régime moyen en France, dans
          lequel la majorité des besoins en proteines sont d'origine animale.
        </li>
        <li>
          le régime <strong>fléxitarien</strong>, qui remplace une partie des
          protéines animales du régime omnivore par des protéines végétales,
        </li>
        <li>
          le régime <strong>végétarien</strong>, qui ne contient pas de
          protéines animales.
        </li>
      </ul>
    </template>

    <template v-slot:form="{ close }">
      <alimentation-form @close="close" />
    </template>

    <template v-slot:card="{ touched }">
      <alimentation-card v-show="touched" />
    </template>
  </category>
</template>

<script>
import Category from './base/Category.vue'
import AlimentationForm from './AlimentationForm.vue'
import AlimentationCard from './AlimentationCard.vue'

export default {
  components: {
    Category,
    AlimentationForm,
    AlimentationCard
  },
  data() {
    return {}
  }
}
</script>

<style></style>
