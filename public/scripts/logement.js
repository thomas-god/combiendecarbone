function Logement(div_id) {
  this.div_id = div_id;

  this.initDiv();
}

Logement.prototype.initDiv = function() {
  const div = document.getElementById(this.div_id);
  div.innerHTML = `
    <h3>Logement et énergie</h3>
        <p>Le secteur résidentiel-tertiaire est directement à l'origine d'environ <a href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf" target="_blank">17%</a> des émissions de gaz à effet de serre en France (la majorité pour nos besoins de chauffage), et ce sans compter les émissions indirectes dues à notre consommation d'électricité.</p>
        <p>Le moyen le plus fiable d'estimer l'impact de notre consommation de <strong>gaz</strong> et <strong>d'électricité</strong> est d'utiliser les mesures utilisées dans nos factures d'énergie.<p>
        <!--<label>
            Connaissez vous vos factures de gaz et d'électricité ?
            <select class="form-input" id="logement-select">
                <option value="oui">Oui</option>
                <option value="non">Non</option>
            </select>
        </label>--!>
        
    <div id="logement-factures" class="logement-factures">
        <h3>Vos consommations</h3>
        <ul>
        <li><label>
            D'électricité (MWh)
            <input type="number" class="form-input" id="logement-elec"  step=0.001 value=0>
        </label></li>
       <li><label>
            De gaz naturel (MWh)
            <input type="number" class="form-input" id="logement-gaz"  step=0.001 value=0>
        </label></il>
        </ul>
    </div>
    <div id="logement-modele" class="disp-none">
    <h2> Pas encore implémenté 🤷‍♂️ 👨‍💻</h2>
    </div>
    `;
  const select = document.getElementById("logement-select");
  // Uncomment when computation not based on bills will be implemented
  /*     select.addEventListener("change", () => {
        var div_factures = document.getElementById("logement-factures")
        var div_modele = document.getElementById("logement-modele")
        if (select.value === "oui") {
            div_factures.classList.remove("disp-none")
            div_modele.classList.add("disp-none")
        } else {
            div_factures.classList.add("disp-none")
            div_modele.classList.remove("disp-none")
        }
    }) */
};

Logement.prototype.computeGES = function() {
  return new Promise((resolve, reject) => {
    const input_elec = document.getElementById("logement-elec");
    const input_gaz = document.getElementById("logement-gaz");
    var elec = input_elec.value > 0 ? input_elec.value : 0;
    var gaz = input_gaz.value > 0 ? input_gaz.value : 0;
    var ges = {
      Électricité: Math.round(elec * 49.02), // kg CO2/MWh
      Gaz: Math.round(gaz * 234) // kg CO2/MWh
    };
    resolve({ name: "Logement", values: ges });
  });
};
