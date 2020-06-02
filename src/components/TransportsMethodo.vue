<template>
  <div>
    <!-- <h2>Émissions des transports</h2> -->
    <h3>Contexte</h3>
    <p>
      Pour calculer les émissions d'un trajet il faut tenir compte de la
      <strong>distance parcourue</strong> (en km) et de
      <strong>l'intensité carbone du moyen de transport utilisé</strong> (en g
      de CO2/km). Pour obtenir les emissions annuelles il suffit ensuite
      d'additionner les emissions de tous les trajets effectués dans l'année, en
      distinguant les trajets <strong>réguliers</strong>, qui se font sur des
      distances faibles mais avec une grande fréquence; et les trajets
      <strong>occasionnels</strong> (vacances notamment), pour lesquels les
      distances parcourues peuvent être très grande.
    </p>

    <h3>Comment calculons-nous les distances parcourues ?</h3>
    <p>
      Afin de calculer la distance d'un trajet on commence par récupérer les
      lieux de départ et d'arrivée en utilisant l'API
      <a href="https://cloud.google.com/maps-platform/places/" target="_blank"
        >Places</a
      >
      de Google Maps.
    </p>

    <p>
      Pour les modes de transport routier et ferroviaire la distance du trajet
      dépend du réseau existant et de l'itinéraire emprunté. Cette itinéraire et
      la distance correspondante est calculé en utilisant l'API
      <a href="https://cloud.google.com/maps-platform/routes/" target="_blank"
        >Routes</a
      >
      de Google Maps. Lorsque les trajets sont multi-modaux (notamment pour les
      transports en commun), l'itinéraire calculé est décomposé en segments pour
      chaque mode utilisé.
    </p>

    <p>
      Dans le cas de l'avion, qui n'utilise pas de réseau mais se déplace en
      ligne droite, on part des coordonnées de départ et de destination et on
      calcule la distance la plus courte sur une sphère ou
      <a
        href="https://fr.wikipedia.org/wiki/Distance_du_grand_cercle"
        target="_blank"
        >distance du grand cercle</a
      >. Pour tenir compte des éventuelles émission hors vol (temps de taxi par
      exemple), la distance du grand cercle est corrigée comme recommandé par
      <a
        href="https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v10-2017.pdf"
        target="_blank"
        >l'ICAO</a
      >.
    </p>
    <h3>Quels facteurs d'émissions utilisons-nous ?</h3>
    <p>
      Le facteur d'émission d'un véhicule ou d'un mode de transport permet de
      passer des kilomètres parcourus à la quantités de gaz à effet de serre
      émis. Ce facteur d'émissions dépend de plusieurs paramètres : la
      consommation en carburant du véhicule, la quantité de CO2 émise lors de la
      combustion du carburant, et le nombre de passagers dans le véhicule ou la
      fréquentation moyenne.
    </p>

    <p>
      Estimer correctement tous ces paramètres est une tache complexe aussi nous
      nous basons sur
      <a href="http://www.basecarbone.fr/" target="_blank">la base carbone</a>
      établie par l'ADEME afin d'avoir des données cohérentes entre elles.
    </p>
    <v-simple-table dense>
      <thead>
        <tr>
          <th scope="col">Mode de transport</th>
          <th scope="col">
            Facteur d'émissions <br />
            (gCO2/km)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Autocar</th>
          <td>154</td>
        </tr>
        <tr>
          <th scope="row">Avion</th>
          <td>249.5</td>
        </tr>
        <tr>
          <th scope="row">Bus (urbain)</th>
          <td>95.6</td>
        </tr>
        <tr>
          <th scope="row">Métro</th>
          <td>5.7</td>
        </tr>
        <tr>
          <th scope="row">RER</th>
          <td>8.9</td>
        </tr>
        <tr>
          <th scope="row">Tram</th>
          <td>6</td>
        </tr>
        <tr>
          <th scope="row">TGV</th>
          <td>3.6</td>
        </tr>
        <tr>
          <th scope="row">Voiture</th>
          <td>280.5</td>
        </tr>
      </tbody>
      <caption>
        Facteurs d'émissions (source:
        <a href="http://www.basecarbone.fr/" target="_blank"
          >Base carbone ADEME</a
        >)
      </caption>
    </v-simple-table>
    <h3>Trajets réguliers <em>vs.</em> trajets occasionnels</h3>
    <p>
      Afin d'épargner aux utilisateurs de devoir préciser qu'ils ont fait 220
      fois dans l'année le même trajet domicile-travail, on distingue les
      trajets réguliers des trajets occasionnels. L'unité de temps de choisie
      est la semaine car elle regroupe une bonne partie de nos déplacements
      réguliers (déplacements pendulaires, activités récurrentes).
    </p>
    <p>
      Les émissions de chaque trajet sont calculées de la même manière pour les
      trajets réguliers et occasionnels, seulement les trajets réguliers ont
      leurs émissions multipliées par 44 semaines (pour prendre en compte
      <a
        href="https://dares.travail-emploi.gouv.fr/dares-etudes-et-statistiques/etudes-et-syntheses/dares-analyses-dares-indicateurs-dares-resultats/article/les-conges-payes-et-jours-de-rtt"
        target="_blank"
        >le nombre moyen de jours de congés/RTT</a
      >) lors du cumul annuel.
    </p>
  </div>
</template>
