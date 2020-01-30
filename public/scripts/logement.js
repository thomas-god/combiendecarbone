function Logement(div_id) {
    this.div_id = div_id;

    this.initDiv()
}

Logement.prototype.initDiv = function () {
    const div = document.getElementById(this.div_id);
    div.innerHTML = `
    <label class="transport-form-row-mode">
        Connaissez vous vos factures de gaz et d'électricité ?
        <select class="form-input" id="logement-select">
            <option value="oui">Oui</option>
            <option value="non">Non</option>
        </select>
    </label>
    <div id="logement-factures" class="logement-factures">
        <ul>
        <li><label>
            Votre consommation d'électricité (MWh)
            <input type="number" class="form-input" id="logement-elec" value=0>
        </label></li>
       <li><label>
            Votre consommation de gaz naturel (MWh)
            <input type="number" class="form-input" id="logement-gaz" value=0>
        </label></il>
        </ul>
    </div>
    <div id="logement-modele" class="disp-none">
    <h2> Not implemented yet :(</h2>
    </div>
    `
    const select = document.getElementById("logement-select")
    select.addEventListener("change", () => {
        var div_factures = document.getElementById("logement-factures")
        var div_modele = document.getElementById("logement-modele")
        if (select.value === "oui") {
            div_factures.classList.remove("disp-none")
            div_modele.classList.add("disp-none")
        } else {
            div_factures.classList.add("disp-none")
            div_modele.classList.remove("disp-none")
        }
    })
}

Logement.prototype.computeGES = function () {
    return new Promise((resolve, reject) => {
        const select = document.getElementById("logement-select")
        if (select.value === "oui") {
            const input_elec = document.getElementById("logement-elec")
            const input_gaz = document.getElementById("logement-gaz")
            var elec = input_elec.value > 0 ? input_elec.value : 0
            var gaz = input_gaz.value > 0 ? input_gaz.value : 0
            var ges = {
                "Électricité": Math.round(elec * 49.02), // kg CO2/MWh
                "Gaz": Math.round(gaz * 234) // kg CO2/MWh
            }
            resolve({ name: "Logement", values: ges });
        } else if (select.value === "non") {
            resolve({ name: "Logement", values: 0 });
        } else {
            resolve({ name: "Logement", values: 0 });
        }
    })
}