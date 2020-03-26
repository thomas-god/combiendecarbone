<template>
  <category>
    <template v-slot:text>
      <p>
        L'industrie est à l'origine d'environ
        <a
          href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf#page=38"
          target="_blank"
          >20%</a
        >
        des émissions de gaz à effet de serre en France. De la fabrication des
        matières premières (acier, plastiques, électronique) à l'assemblage et
        aux transport des produits finis, l'achat d'un objet représente donc une
        source d'émissions indirectes, en France ou à l'étranger en cas
        d'importation.
      </p>
      <p>
        Nous avons considéré 3 catégories d'objets: les vêtements, les objets
        high-tech et l'électroménager. Pour les vêtements il vous suffit de
        renseigner combien vous achetez de chaque type chaque année. Pour les
        objets high-tech et l'électroménager que nous gardons plusieurs années,
        renseigner combien d'années vous gardez en moyenne chaque produit.
      </p>
    </template>

    <template v-slot:form="{ close }">
      <consommation-form @close="close" />
    </template>

    <template v-slot:card> </template>
  </category>
</template>

<script>
import Category from './base/Category.vue'
import ConsommationForm from './ConsommationForm.vue'
export default {
  components: {
    Category,
    ConsommationForm
  }
}
</script>

<style></style>
