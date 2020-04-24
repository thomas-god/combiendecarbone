<template>
  <div>
    <h3>Émissions liées au logement</h3>
    <p>
      La consommation énergétique d'un logement (et donc ses émissions) peuvent
      être classées en deux catégories:
    </p>
    <ul>
      <li>
        celles liées au chauffage (qu'il soit au gaz ou à l'électricité),
      </li>
      <li>
        et le reste des consommations électriques (électroménager, éclairage,
        etc.).
      </li>
    </ul>
    <p>
      La méthode la plus fiable est de se baser sur les factures de vos
      fournisseurs de gaz et d'éléctricité qui vous donneront vos consommations
      éxactes de gaz et d'électricité en kWh. Une fois vos consommations connues
      il nous suffit de les multiplier par les facteur d'émissions du système
      électrique français et du gaz pour obtenir vous émissions de CO2.
    </p>
    <h3>Facteur d'émission de l'électricité</h3>
    <p>
      Pour calculer le facteur d'émission de CO2 du secteur électrique français
      nous utilisons les
      <a
        href="https://www.rte-france.com/fr/article/bilans-electriques-nationaux"
        target="_blank"
      >
        bilans électriques nationaux de RTE</a
      >. Ces bilans donnent la production électrique totale de toutes les
      filières de production en TWh ainsi que la quantité émise de CO2 en MT, le
      ratio des deux permettant d'obtenir le facteur d'émission moyen pour le
      système électrique.
    </p>
    <p>
      Ce facteur d'émissions pouvant varier d'une année à l'autre (hiver plus ou
      moins doux, disponibilité des parcs hydraulique et nucléaire, etc.) nous
      avons pris la moyenne des facteurs d'émissions annuels depuis 2010 pour
      obtenir une valeur de
      <strong>49 kgCO2/MWh</strong>.
    </p>
    <h3>Facteur d'émission du gaz naturel</h3>
    <p>
      <a
        href="https://www.grdf.fr/institutionnel/role-transition-ecologique/energie-avenir/energie-respect-environnement"
        target="_blank"
        >GRDF</a
      >
      donne pour du gaz naturel un facteur d'émissions de
      <strong>234 kgCO2/MWh</strong>.
    </p>
    <h3>Pour aller plus loin</h3>
    <ul>
      <li>
        Comprendre ses relevés de compteurs gaz et électricité sur
        <a
          href="https://www.energie-info.fr/fiche_pratique/releve-des-compteurs-et-calcul-de-la-consommation/"
          target="_blank"
          >energie-info.fr</a
        >
      </li>
      <li>
        Comprendre le coefficient de conversion pour le gaz naturel sur
        <a
          href="https://www.grdf.fr/particuliers/coefficient-conversion-commune"
          target="_blank"
          >grdf.fr</a
        >
      </li>
      <li>
        Le site de la Commission de Régulation de l'Energie (<a
          href="https://www.cre.fr/"
          target="_blank"
          >cre.fr</a
        >).
      </li>
    </ul>
  </div>
</template>
