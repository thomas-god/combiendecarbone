function Logement(div_id) {
    this.div_id = div_id;

    this.initDiv()
}

Logement.prototype.initDiv = function () {
    const div = document.getElementById(this.div_id);
    div.innerHTML = `
    <label class="transport-form-row-mode">
        Connaissez vous vos factures de gaz et d'électricité ?
        <select class="form-input">
            <option value="oui">Oui</option>
            <option value="non">Non</option>
        </select>
    </label>
    <div id="logement-factures" class="logement-factures">
        <label>
            Consommation d'électricité (MWh)
            <input type="number" class="form-input" id="logement-elec" value=0>
        </label>
        <label>
            Consommation de gaz naturel (MWh)
            <input type="number" class="form-input" id="logement-gaz" value=0>
        </label>
    </div>
    <div id="logement-modele">
    </div>
    `

}