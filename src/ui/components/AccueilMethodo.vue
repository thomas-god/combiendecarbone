<template>
  <div>
    <h3>Contexte</h3>
    <p>
      Selon le
      <a
        href="https://www.ipcc.ch/site/assets/uploads/2018/02/ipcc_wg3_ar5_summary-for-policymakers.pdf"
        target="_blank"
        >GIEC</a
      >, limiter l'élévation de la température moyenne à la surface du globe à
      2°C à l'horizon 2100 implique de ne pas dépasser une concentration de gaz
      à effet de serre de 450 ppm eq.CO2 à ce même horizon. Cette concentration
      étant estimée à 430 (± 90) ppm eq.CO2 en 2011, si nos emissions de gaz à
      effet de serre continuent de croître à leur rythme actuel, nous pourrions
      atteindre des concentration supérieures à 700 ppm eq.CO2 en 2100 et
      s'exposer à des élevations de la température moyenne pouvant atteindre
      +4°C.
    </p>
    <p class="methodologie-encart">
      <v-icon large color="green" class="float-left ml-1 mr-2 mt-2"
        >mdi-help-circle-outline</v-icon
      >
      Plusieurs gaz contribuent à l'effet de serre global : dioxyde de carbone
      (CO2), méthane (CH4), protoxyde d'azote (N2O), composés souffrés, etc,
      avec une contribution plus ou moins importante. Pour agréger l'impact de
      tous ces gaz les quantités émises sont converties en equivalent CO2 en
      utilisant leur pouvoir réchauffant global à 100 ans (<a
        href="https://www.ghgprotocol.org/sites/default/files/ghgp/Global-Warming-Potential-Values%20%28Feb%2016%202016%29_1.pdf"
        target="_blank"
        >PRG</a
      >). Par exemple si on émet 1 kg de méthane avec un PRG de 28, l'impact
      sera équivalent à 28 kg eq.CO2 émis.
    </p>

    <p>
      S'il est nécessaire de mettre en place des politiques coordonnées
      multi-sectorielles pour réduire efficacement nos émissions globales, il
      n'en reste pas moins nécessaire que les consommateurs et citoyens
      s'engagent dans cette démarche de réduction de nos émissions de gaz à
      effet de serre.
    </p>
    <p class="methodologie-encart">
      <v-icon large color="red" class="float-left ml-1 mr-2 mt-2"
        >mdi-alert-circle-outline</v-icon
      >Ce calculateur se concentre sur les émissions de gaz à effet de serre, et
      ne considère pas d'autres impacts de nos usages, qu'ils soient
      environnementaux (consommation d'eau, pollution des sols, déplétion des
      ressources naturelles) ou sociaux (conditions de travail et rémunération
      des acteurs). Pour aller plus loin sur le sujet vous pouvez consulter la
      notion de
      <a
        href="https://fr.wikipedia.org/wiki/Limites_plan%C3%A9taires"
        target="_blank"
        >limites planétaires</a
      >.
    </p>

    <h3>Classement des émissions par secteurs</h3>

    <p>
      Le GIEC classe les émissions de gaz à effet de serre dans 5 catégories:
      l'énergie, l'industrie, le transport, les bâtiments et l'agriculture et la
      foresterie. Pour faire une analyse individuelle plus lisible des émissions
      nous avons utilisé un découpage en 4 catégories:
    </p>
    <ul>
      <li>
        les <strong>transports personnels </strong>(qui exclut notamment le
        transport des biens),
      </li>
      <li>
        le <strong>logement</strong>, qui regroupe les émissions liées aux
        dépenses énergétique en chauffage et électricité,
      </li>
      <li>
        l'<strong>alimentation</strong>, qui regroupe les émissions directes de
        l'agriculture et les émissions liées aux dépenses énergétiques du
        secteur (transformation et transport),
      </li>
      <li>
        la <strong>consommation</strong>, liée aux biens que nous achetons
        (extraction et transformation des matières premières, production,
        transport).
      </li>
    </ul>
    <p>
      A ces 4 categories s'ajoutent les émissions incompressibles des services
      publics que nous utilisons (santé, éducation, police, etc.). Ces émissions
      sont de l'ordre de 1 200 kg eq.CO2 par an et par habitant.
    </p>

    <h3>Base Carbone de l'ADEME</h3>
    <p>
      L'Agence de l'Environnement et de la Maîtrise de l'Énergie (<a
        href="https://www.ademe.fr/"
        target="_blank"
        >ADEME</a
      >) met à disposition une base de données publique (inscription obligatoire
      mais gratuite),
      <a href="https://www.bilans-ges.ademe.fr/fr/accueil" target="_blank"
        >Base Carbone</a
      >, de facteurs d'émission de gaz à effet de serre pour un certain nombre
      et d'activités et de produits en France. Les données de cette base sont
      trés largement utilisées dans ce calculateur d'impact carbone.
    </p>
  </div>
</template>
