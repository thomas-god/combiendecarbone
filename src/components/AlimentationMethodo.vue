<template>
  <div>
    <h3>Contexte</h3>
    <p>
      Le secteur de l'agroalimentaire représente
      <a
        href="http://multimedia.ademe.fr/animations/alimentation/"
        target="_blank"
        >une part importante</a
      >
      des émissions de gaz à effet de serre en France. Les émissions ont lieu
      lors de
      <a
        href="https://www.ademe.fr/manger-mieux-gaspiller-moins"
        target="_blank"
        >quatre phases</a
      >: la production (élevage, agriculture), la transformation, la
      distribution (transport, chaîne du froid) et l'utilisation finale
      (conservation, cuisson). Les émissions de chaque aliment vont donc
      dépendre du type d'aliment (viande, céréales, légumes), du mode de
      production (fruit et légumes de saison, culture en serre) et du transport
      (production locale ou non).
    </p>
    <h3>Base de données Food'GES</h3>
    <p>
      La base de données
      <a
        href="http://www.bilans-ges.ademe.fr/fr/actualite/actualite/detail/id/23"
        target="_blank"
        >Food'GES</a
      >
      recense pour un grand nombre d'aliments et de plats cuisinés les émissions
      de gaz à effet de serre au cours des différentes phases. On distingue 3
      types de repas du point de vue des émissions de gaz à effet de serre :
      avec viande rouge, avec viande blanche, et sans viande (végétarien voir
      végétalien). Différentes sources estiment les émissions de gaz à effet de
      serre pour ces différents repas, une valeur centrale ayant été retenue
      dans ce calculateur.
      <v-simple-table dense class="table-wide">
        <caption>
          Emissions par type de repas, hors cuisson et gestion des déchets.
        </caption>
        <thead>
          <tr>
            <th scope="col" rowspan="2">Type de repas</th>
            <th scope="col" colspan="5">
              Émissions par repas (kg eq.CO2)
            </th>
          </tr>
          <tr>
            <th scope="col">
              Source 1
            </th>
            <th scope="col">
              Source 2
            </th>
            <th scope="col">
              Source 3
            </th>
            <th scope="col">
              Source 4
            </th>
            <th scope="col">
              Valeur retenue
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Avec viande rouge</th>
            <td>5.19</td>
            <td>6.29</td>
            <td>2.01</td>
            <td>7.26</td>
            <th scope="row">6.00</th>
          </tr>
          <tr>
            <th scope="row">Avec viande blanche</th>
            <td>2.46</td>
            <td>1.35</td>
            <td>0.80</td>
            <td>1.58</td>
            <th scope="row">1.90</th>
          </tr>
          <tr>
            <th scope="row">Sans viande</th>
            <td>1.70</td>
            <td>0.51</td>
            <td>-</td>
            <td>-</td>
            <th scope="row">0.90</th>
          </tr>
        </tbody>
      </v-simple-table>
    </p>
    <ul>
      <li style="font-size: 0.9rem !important">
        Source 1 : Manger mieux, gaspiller moins, sur
        <a
          href="https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-manger-mieux-gaspiller-moins.pdf"
          target="_blank"
          >ADEME</a
        >
      </li>
      <li style="font-size: 0.9rem !important">
        Source 2 : Base carbone, rubrique restauration, partie repas classiques,
        sur
        <a
          href="http://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Repas"
          target="_blank"
          >ADEME</a
        >
      </li>
      <li style="font-size: 0.9rem !important">
        Source 3 : Base carbone, rubrique restauration, partie repas à dominante
        végétale, sur
        <a
          href="http://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Repas"
          target="_blank"
          >ADEME</a
        >
      </li>
      <li style="font-size: 0.9rem !important">
        Source 4 : Base carbone, rubrique restauration, partie repas à dominante
        animale, sur
        <a
          href="http://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Repas"
          target="_blank"
          >ADEME</a
        >
      </li>
    </ul>

    <h3>Pour aller plus loin</h3>
    <ul>
      <li>
        Vers une alimentation bas carbone, saine et abordable, sur
        <a
          href="https://www.wwf.fr/sites/default/files/doc-2017-11/171109_rapport_vers_une_alimentation_bas_carbone_saine_abordable_0.pdf"
          target="_blank"
          >WWF</a
        >
      </li>
    </ul>
  </div>
</template>
