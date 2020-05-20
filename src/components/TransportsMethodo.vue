<template>
  <div>
    <h2>Émissions des transports</h2>
    <p>
      Pour calculer les émissions d'un trajet il faut tenir compte de la
      <strong>distance parcourue</strong> (en km) et de
      <strong>l'intensité carbone du moyen de transport utilisé</strong> (en g
      de CO2/km). Pour obtenir les emissions annuelles il faut ensuite sommer
      les emissions de tous les trajets effectués dans l'année. On distingue
      alors les trajets <strong>réguliers</strong>, qui se font sur des
      distances faibles mais avec une grande fréquence; et les trajets
      <strong>occasionnels</strong>, pour les vacances notamment, pour lesquels
      les distances parcourues peuvent être très grande.
    </p>

    <h3>Comment calculons-nous les distances parcourues ?</h3>
    <p>
      Quel que soit le mode de transport utilisé, chaque calcul de trajet
      commence par récupérer les lieux de départ et d'arrivée via l'API
      <a href="https://cloud.google.com/maps-platform/places/" target="_blank"
        >Places</a
      >
      de Google Maps. Une fois ces lieux récupérés nous pouvons facilement
      obtenir leurs coordonnées ou utiliser d'autres API pour calculer des
      distances.
    </p>
    <h4>Voiture, car, vélo</h4>
    <p>
      Ces modes de transport sont les plus simples à traiter puisque il suffit
      de calculer la longueur de la route reliant les points de départ et
      d"arrivée, ce qui est fait via l'API
      <a href="https://cloud.google.com/maps-platform/routes/" target="_blank"
        >Routes</a
      >
      de Google Maps.
    </p>
    <h4>Transports en commun</h4>
    <p>
      Les trajets en transports en commun ont cela de plus compliqué qu'ils sont
      souvent multimodaux, c'est-à-dire que plusieurs mode de transport
      différents sont utilisés. La distance totale doit donc être subdivisée par
      mode de transport, chaque partie contribuant aux émissions totales du
      trajet suivant l'intensité de son mode de transport. Les différentes
      étapes du trajet sont retournées par l'API
      <a href="https://cloud.google.com/maps-platform/routes/" target="_blank"
        >Routes</a
      >
      de Google Maps.
    </p>
    <h4>TGV</h4>
    <p>
      Les trajets en train se font de gare à gare et les distances retournées
      par l'API
      <a href="https://cloud.google.com/maps-platform/routes/" target="_blank"
        >Routes</a
      >
      de Google Maps.
    </p>
    <h4>Avion</h4>
    <p>
      À l'inverse des modes précédents qui doivent utiliser un réseau existant
      pour se déplacer (réseau routier ou ferroviaire), l'avion permet lui de
      rallier sa destination en ligne droite. En partant des coordonnées
      retournées de départ et de destination on peut calculer la distance la
      plus courte sur une sphère ou
      <a
        href="https://fr.wikipedia.org/wiki/Distance_du_grand_cercle"
        target="_blank"
        >distance du grand cercle</a
      >.
    </p>
    <p>
      Pour tenir compte des éventuelles émission hors vol (temps de taxi par
      exemple), la distance du grand cercle est corrigée comme recommandé par
      <a
        href="https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v10-2017.pdf"
        target="_blank"
        >l'ICAO</a
      >.
    </p>
    <h3>Quels facteurs d'émissions utilisons-nous ?</h3>
    <p>
      Afin de pouvoir comparer entre eux les différents modes de transport on
      utilise le facteur d'émission en g de CO2 par km et par passager. Ce
      facteur va dépendre:
    </p>
    <ul>
      <li>
        de la consommation en carburant du véhicule (voiture, avion, etc.), en
        kg de carburant par km,
      </li>
      <li>
        de la quantité de CO2 émise lors de la combustion du carburant (en kg de
        CO2 par kg de carburant),
      </li>
      <li>
        et du nombre de passagers dans le véhicule ou de la fréquentation
        moyenne.
      </li>
    </ul>
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
          <th scope="row">Avion</th>
          <td>249.5</td>
        </tr>
        <tr>
          <th scope="row">Métro</th>
          <td>5.7</td>
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
          <th scope="row">RER</th>
          <td>8.9</td>
        </tr>
        <tr>
          <th scope="row">Bus (urbain)</th>
          <td>95.6</td>
        </tr>
        <tr>
          <th scope="row">Autocar</th>
          <td>154</td>
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
      Pour des questions d'experience utilisateur nous avons choisi de
      différencier les trajets réguliers des trajets occasionnels, afin de vous
      éviter de devoir préciser que vous avez fait 197 fois votre trajets
      domicile/travail dans l'année. La semaine nous a semblé être la bonne
      unité de temps car cela permet de prendre en compte des situation variées
      (travail à temps plein/temps partiels, jours de télétravail, activités
      hebdomadaires, etc.).
    </p>
    <p>
      Une fois votre semaine type renseignée nous calculons les emissions de
      tous vos trajets et nous multiplions le total par
      <strong>44 semaines</strong> afin prendre en compte
      <a
        href="https://dares.travail-emploi.gouv.fr/dares-etudes-et-statistiques/etudes-et-syntheses/dares-analyses-dares-indicateurs-dares-resultats/article/les-conges-payes-et-jours-de-rtt"
        target="_blank"
        >le nombre moyen de jours de congés/RTT</a
      >.
    </p>
    <p>
      Quand aux trajets occasionnels nous calculons simplement les emissions de
      chaque trajet.
    </p>
  </div>
</template>
