<template>
  <div>
    <h3>Émissions liées à notre consommation de biens</h3>
    <p>
      Les biens manufacturés engendrent des émissions de gaz à effet de serre
      tout au long de leur cycle de vie, de la phase d'extraction des matières
      premières, aux processus de fabrication, en passant par leur transport,
      leur utilisation et leur recyclage.
    </p>
    <p>
      Trois segments ont été identifiés dans la
      <a
        href="https://www.ademe.fr/sites/default/files/assets/documents/poids_carbone-biens-equipement-201809-rapport.pdf"
        target="_blank"
        >base carbone</a
      >
      de l'ADEME: le textile, les équipements high-tech et l'électroménager. Ces
      segments se distinguent par la part importante de la fabrication (matières
      premières et assemblage) dans les émissions.
    </p>

    <h3>Électroménager et objets high-tech</h3>
    <p>
      L'électroménager et les équipements high-tech n'étant pas des achats
      récurrents et pouvant avoir une durée de vie importante, nous avons choisi
      de ne pas comptabiliser la totalité des émissions engendrées par l'achat
      du bien lors l'année d'achat, mais de les amortir par la durée de
      possession. <br />
      Par l'exemple, l'achat d'un ordinateur portable (156 kg eq.CO2) pèsera
      pour 31,2 kg eq.CO2 dans votre bilan annuel si vous le gardez 5 ans contre
      78 kg eq.CO2 si vous le gardez 2 ans.
    </p>
    <p>
      Les émissions sont calculées "jusqu'au magasin", c'est à dire que ne sont
      pas prises en compte les émissions liées à l'usage (d'électricité
      notamment, qui est déjà prise en compte dans votre bilan logement) ni au
      recyclage des objets.
    </p>
    <table>
      <caption>
        Emissions des objets high-tech (source
        <a
          href="https://www.ademe.fr/sites/default/files/assets/documents/poids_carbone-biens-equipement-201809-rapport.pdf"
          target="_blank"
          >Base Carbone ADEME</a
        >, hors utilisation et recyclage).
      </caption>
      <thead>
        <tr>
          <th scope="col">Objet</th>
          <th scope="col">
            Émissions <br />
            (kg eq.CO2/objet)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Smartphone</th>
          <td>30</td>
        </tr>
        <tr>
          <th scope="row">Ordinateur portable</th>
          <td>156</td>
        </tr>
        <tr>
          <th scope="row">Ordinateur fixe</th>
          <td>200</td>
        </tr>
        <tr>
          <th scope="row">Télévision</th>
          <td>350</td>
        </tr>
      </tbody>
    </table>

    <table>
      <caption>
        Emissions des objets électroménagers (source
        <a
          href="https://www.ademe.fr/sites/default/files/assets/documents/poids_carbone-biens-equipement-201809-rapport.pdf"
          target="_blank"
          >Base Carbone ADEME</a
        >, hors utilisation et recyclage).
      </caption>
      <thead>
        <tr>
          <th scope="col">Objet</th>
          <th scope="col">
            Émissions <br />
            (kg eq.CO2/objet)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Four</th>
          <td>217</td>
        </tr>
        <tr>
          <th scope="row">Lave-vaisselle</th>
          <td>253</td>
        </tr>
        <tr>
          <th scope="row">Lave-linge</th>
          <td>320</td>
        </tr>
        <tr>
          <th scope="row">Réfrigérateur</th>
          <td>257</td>
        </tr>
      </tbody>
    </table>
    <h3>Vêtements et textile</h3>
    <p>
      Les achats de vêtements étant plus fréquents, les émissions engendrées ne
      sont pas amorties par la durée d'utilisation dans votre bilan annuel.
    </p>
    <p>
      Les émissions sont calculées "jusqu'au magasin", ne sont donc pas prises
      en compte les émissions liées à l'entretien (machine à laver, séchage,
      repassage) ni à leur recyclage.
    </p>

    <table>
      <caption>
        Emissions du textile (source
        <a
          href="https://www.ademe.fr/sites/default/files/assets/documents/poids_carbone-biens-equipement-201809-rapport.pdf"
          >Base Carbone ADEME</a
        >, hors utilisation et recyclage).
      </caption>
      <thead>
        <tr>
          <th scope="col">Objet</th>
          <th scope="col">
            Émissions <br />
            (kg eq.CO2/objet)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Jeans</th>
          <td>25</td>
        </tr>
        <tr>
          <th scope="row">Tee-shirt</th>
          <td>7</td>
        </tr>
        <tr>
          <th scope="row">Chemise</th>
          <td>13</td>
        </tr>
        <tr>
          <th scope="row">Pull acrylique</th>
          <td>28</td>
        </tr>
        <tr>
          <th scope="row">Pull laine</th>
          <td>56</td>
        </tr>
        <tr>
          <th scope="row">Sweat coton</th>
          <td>31</td>
        </tr>
        <tr>
          <th scope="row">Robe</th>
          <td>56</td>
        </tr>
        <tr>
          <th scope="row">Manteau</th>
          <td>89</td>
        </tr>
        <tr>
          <th scope="row">Chaussures</th>
          <td>19</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
