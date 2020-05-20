<template>
  <div>
    <h2>Émissions liées à l'alimentation</h2>
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
      (conservation, cuisson).
    </p>
    <p>
      Les émissions de chaque aliment vont donc dépendre du type d'aliment
      (viande, céréales, légumes), du mode de production (fruit et légumes de
      saison, culture en serre) et du transport (production locale ou non).
    </p>
    <p>
      Les données de la base
      <a
        href="http://www.bilans-ges.ademe.fr/fr/actualite/actualite/detail/id/23"
        target="_blank"
        >Food'GES</a
      >
      montrent que la phase "amont agricole" est de loin la plus émettrice.
      C'est pourquoi nous avons choisi d'utiliser les régimes alimentaires comme
      critère distinctif. Chaque régime alimentaire remplit les besoins
      nutritifs quotidiens nécessaires avec différents types d'aliments:
    </p>
    <ul>
      <li>
        le régime omnivore (assiette moyenne française) fait la part belle aux
        produits carnés et d'origine animale ainsi qu'aux produits transformés.
      </li>
      <li>
        le régime
        <a
          href="https://www.wwf.fr/sites/default/files/doc-2017-11/171109_rapport_vers_une_alimentation_bas_carbone_saine_abordable_0.pdf"
          target="_blank"
          >fléxitarien</a
        >
        tend à réduire la part d'origine animale pour favoriser les légumes,
        céréales et légumineuses.
      </li>
      <li>le régime végétarien exclue tout produit d'origine animale.</li>
    </ul>
    <p>
      Le tableau suivant regroupe les facteurs d'émissions utilisés pour les
      différents régimes. Ces facteurs excluent le transport depuis le magasin
      (émissions déjà couvertes dans votre rubrique
      <em>Transports</em>) et la conversation et cuisson chez vous (émissions
      déjà couvertes dans votre rubrique <em>Logement</em>)
    </p>
    <v-simple-table dense>
      <caption>
        Emissions par type de régimes alimentaires (source
        <a
          href="http://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Repas"
          target="_blank"
          >Base Carbone ADEME</a
        >, hors cuisson et gestion des déchets).
      </caption>
      <thead>
        <tr>
          <th scope="col">Régime</th>
          <th scope="col">
            Facteur d'émissions <br />
            (kgCO2/jour)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Régime omnivore</th>
          <td>4.474</td>
        </tr>
        <tr>
          <th scope="row">Régime fléxitarien</th>
          <td>2.817</td>
        </tr>
        <tr>
          <th scope="row">Régime végétarien</th>
          <td>1.9</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
