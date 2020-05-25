<template>
  <v-content class="mx-auto">
    <v-card max-width="650px" class="mx-auto my-0 pa-3">
      <v-card-title>
        <h3 class="text-center mx-auto">
          Estimez votre empreinte carbone ! 🍃
        </h3>
      </v-card-title>
      <v-card-text class="text-justify">
        <p>
          Si de plus en plus de personnes souhaitent modifier leurs habitudes de
          consommation pour lutter contre le changement climatique, il n'est pas
          facile de savoir par où commencer tant le problème est complexe. Comme
          la plupart nos activités émettent des gaz à effet de serre on ne sait
          pas toujours quel sera l'impact d'une modification de nos habitudes et
          si on ne devrait pas mieux concentrer nos efforts ailleurs.
        </p>
        <p>
          Pour y voir plus clair nous vous proposons donc de commencer par faire
          un état des lieux de vos émissions de gaz à effet de serre selon 4
          catégories : le transport, le logement, l'alimentation et la
          consommation de biens. Une fois vos principaux postes d'émissions
          identifiés vous pourrez alors commencer à réfléchir aux solutions à
          mettre en place pour réduire leurs impacts.
        </p>
        <p class="mt-2">
          Enfin, pour aller plus loin et pour toute question concernant
          l'élaboration de votre diagnostic carbone n'hésitez pas à consulter
          notre page
          <router-link to="/methodologie/general">
            <em>Méthodologie</em> </router-link
          >.
        </p>
        <v-card-actions>
          <router-link to="/forms/transports" class="mx-auto">
            <v-btn color="primary">
              Commencer !
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-content>
</template>
