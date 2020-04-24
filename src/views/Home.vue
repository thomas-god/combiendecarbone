<template>
  <v-content class="mx-auto">
    <v-card max-width="650px" class="mx-auto my-0">
      <v-card-title>
        <h3 class="text-center mx-auto">
          Estimez votre empreinte carbone ! 🍃
        </h3>
      </v-card-title>
      <v-card-text class="text-justify">
        <p>
          Si de plus en plus de personnes souhaitent modifier leurs habitudes de
          consommation pour faire face au changement climatique, il n'est pas
          facile de savoir par où commencer tant le problème est complexe. Comme
          presque toutes nos activités sont émettrices de gaz à effet de serre
          on ne sait pas toujours si une modification de nos habitudes aura un
          vrai impact et si on ne devrait pas mieux concentrer nos efforts sur
          autre chose.
        </p>
        <p>
          Ce questionnaire va vous permettre d'estimer votre empreinte carbone
          annuelle selon 4 catégories: le transport, le logement, l'alimentation
          et votre consommation de biens. Pour chaque catégorie vous saurez quel
          poste contribue le plus à votre empreinte carbone : le vol
          Paris/New-York de vos dernières vacances ou vos trajets quotidiens en
          voiture vers votre lieu de travail ?
        </p>
        <p>
          En vous permettant d'identifier vos principaux postes d'émissions de
          gaz à effet de serre nous espérons que ce calculateur vous permettra
          de plus facilement choisir quelle habitude changer en premier !
        </p>
        <p>
          Pour toute question concernant notre méthodologie vous pouvez
          consulter notre page
          <em>Méthodologie</em> ℹ️.
        </p>
      </v-card-text>
      <v-card-actions>
        <router-link to="/forms/transports" class="mx-auto">
          <v-btn color="primary">
            Commencer !
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-content>
</template>
