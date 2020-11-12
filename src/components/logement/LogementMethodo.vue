<template>
  <div>
    <h3>Contexte</h3>
    <p>
      La consommation énergétique d'un logement regroupe une large gamme
      d'usages : chauffage, cuisson, eau chaude sanitaire, consommations
      électriques, etc. Pour chaque usage la consommation dépend de l'intensité
      de l'usage (influence du climat sur le chauffage, mais aussi des
      préférences de confort de chacun et qualité de l'isolation) et de
      l'efficacité énergétique de l'équipement utilisé (classe énergétique mais
      aussi le type d'énergie utilisé).
    </p>

    <p>
      Une méthode simple et fiable consiste à se baser sur les factures des
      fournisseurs d'énergie (gaz, éléctricité, fioul, bois) qui donnent les
      consommations éxactes du logement. Une fois les consommations connues il
      suffit d'utiliser les facteur d'émissions (détaillés plus bas) de chaque
      source pour obtenir les émissions de CO2 correspondantes. Si vous ne
      connaissez pas vos factures ou n'en avez pas, un formulaire simple est
      proposé pour estimer votre consommation.
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
      filières de production en TWh ainsi que la quantité émise de CO2 en
      millions de tonnes, le ratio des deux permettant d'obtenir le facteur
      d'émission moyen pour le système électrique.
    </p>
    <p>
      Ce facteur d'émissions pouvant varier d'une année à l'autre (hiver plus ou
      moins doux, disponibilité des parcs hydraulique et nucléaire, etc.), la
      moyenne des facteurs d'émissions annuels depuis 2010 pour donne une valeur
      de
      <strong>49 kg eq.CO2/MWh</strong>.
    </p>
    <h3>Facteur d'émission du gaz naturel</h3>
    <p>
      <a
        href="https://www.grdf.fr/institutionnel/role-transition-ecologique/energie-avenir/energie-respect-environnement"
        target="_blank"
        >GRDF</a
      >
      donne pour du gaz naturel un facteur d'émissions de
      <strong>227 kg eq.CO2/MWh</strong>.
    </p>
    <h3>Facteur d'émission du fioul domestique</h3>
    <p>
      <a
        href="https://www.bilans-ges.ademe.fr/fr/basecarbone/donnees-consulter/liste-element/categorie/20"
        target="_blank"
        >L'ADEME</a
      >
      donne au fioul à usage domestique, en France métropolitaine, un facteur
      d'émissions de
      <strong>3,19 kg eq.CO2/litre</strong>.
    </p>
    <h3>Facteur d'émission du bois de chauffage</h3>
    <p>
      Le bois du chauffage couvre une large gamme de produits (buches, palettes,
      granulés) aux propriétés différentes (densité, taux d'humidité). On
      retiendra qu'un stère de bois (1m3) a une masse d'environ 500 kg et que
      l'<a
        href="https://www.bilans-ges.ademe.fr/fr/basecarbone/donnees-consulter/liste-element/categorie/36"
        target="_blank"
        >ADEME</a
      >
      donne un facteur d'émissions de 0,114 kg eq.CO2/kg, soit
      <strong>57 kg eq.CO2/stère</strong>.
    </p>

    <h3>Estimation en cas des factures manquantes</h3>
    <p>
      Afin de construire une estimation simple de la consommation énergétique
      d'un logement on considère 2 postes de consommation : une base électrique
      qui correspond aux consommations des appareils électriques, et une partie
      gaz ou électricité qui correspond à la partie chauffage.
    </p>

    <p>
      La base électrique dépend de l'efficacité énergétique des équipements
      utilisés ainsi que des habitudes d'usage. RTE, dans son
      <a
        href="https://www.rte-france.com/sites/default/files/bp2016_complet_vf.pdf"
        target="_blank"
        >Bilan Prévisionnel</a
      >
      (p. 22), estime que la consommation électrique des usages domestiques
      correspond en moyenne à 2,6 MWh par an. Cette consommation annuelle peut
      atteindre 3,4 MWh pour des équipements très énergivores, et 1,3 MWh pour
      des équipements économes. Le formulaire contient 4 paliers pour le taux
      d'équipements en appareils économes :
      <em>Aucun équipements</em> (3,4 MWh/an), <em>Quelques-uns</em> (2,875
      MWh/an), <em></em> (1,825 MWh/an), <em>Tout équipé</em> (1,3 MWh/an).
    </p>

    <p>
      La partie chauffage dépend du type d'énergie utilisé (électricité ou gaz)
      et du niveau d'isolation du logement. Pour un logement ancien (mauvaise
      isolation) les besoins en chauffage correspondent à un consommation
      d'électricité de 52 kWh/m<sup>2</sup> (source :
      <a
        href="https://www.rte-france.com/sites/default/files/bp2016_complet_vf.pdf"
        target="_blank"
      >
        Bilan Prévisionnel RTE, p. 19</a
      >), et pour le gaz à 143 kWh/m<sup>2</sup> (source:
      <a
        href="https://gaz-tarif-reglemente.fr/gaz/comprendre-gaz-naturel/consommation-gaz.html"
        target="_blank"
      >
        Gaz Tarif Réglementé</a
      >). Que ce soit pour un chauffage gaz ou électrique, des travaux
      d'isolation peuvent diminuer la consommation énergétique jusqu'à -75%
      (mêmes sources).
    </p>

    <p class="methodologie-encart">
      <v-icon large color="red" class="float-left ml-1 mr-2 mt-2"
        >mdi-alert-circle-outline</v-icon
      >Cette approche se base sur des données moyennes des ménages français et
      est forcément moins précise qu'une connaissance exacte de vos
      consommation. Il est notamment difficile de prendre en compte les
      habitudes de consommation, les particularités du logement et de la
      localisation, etc.
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
      <li>
        Réduire sa facture d'électricité au quotidien (<a
          href="https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-reduire-facture-electricite.pdf"
          target="_blank"
          >ADEME</a
        >).
      </li>
    </ul>
  </div>
</template>
