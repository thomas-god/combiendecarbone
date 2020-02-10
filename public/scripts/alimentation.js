function Alimentation(div_id) {
    this.div_id = div_id;
    this.repas_boxes = {}
    this.repas_restants = 14;
    this.initDiv();
}

Alimentation.prototype.initDiv = function () {
    const div = document.getElementById(this.div_id)
    div.innerHTML = `
    <h3>Habitudes alimentaires</h3>
    <p>Le secteur de l'agriculture est à l'origine d'environ <a href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf">16%</a> des émissions de gaz à effet de serre en France, principalement via le méthane émis par les animaux, et les engrais azotés. Les émissions de gaz à effet de serre variant d'un aliment à un autre, un moyen efficace d'estimer nos émissions dues à notre alimentation est de raisonner en terme de régimes alimentaires.</p>
    <p>Nous avons retenu 3 régimes alimentaires suivant leur teneur en protéines animales ou végétales :</p>
    <ul>
        <li>le régime <strong>omnivore</strong>, ou régime moyen en France, </li>
        <li>le régime <strong>fléxitarien</strong>, qui remplace environ 2/3 des protéines animales du régime omnivore par des protéines végétales, </li>
        <li>le régime <strong>végétarien</strong>, qui ne contient pas de protéines animales. </li>
    </ul>
    <p>Comme changer ses habitudes alimentaires peut prendre du temps, vous pouvez composer votre régime alimentaire hebdomadaire typique à partir des 3 régimes précédents.</p>

    <h3>Votre semaine type en 14 repas</h3>
    <div class="form-repas">
        <span id="repas-restants-box" class="form-repas-box">
        </span>
        <span id="repas-omni" class="form-repas-controls">
            <label>Repas omnivores 🥩</label>
            <span>
                <button id="repas-omni-moins">-</button>
                <input type="number" id="repas-omni-num" value=0 readonly=true>
                <button id="repas-omni-plus">+</button>
            </span>
        </span>
        <span id="repas-flex" class="form-repas-controls">
            <label>Repas fléxitariens 🥗</label>
            <span>
                <button id="repas-flex-moins">-</button>
                <input type="number" id="repas-flex-num" value=0 readonly=true>
                <button id="repas-flex-plus">+</button>
            </span>
        </span>
        <span id="repas-vege" class="form-repas-controls">
            <label>Repas végétariens 🥦</label>
            <span>
                <button id="repas-vege-moins">-</button>
                <input type="number" id="repas-vege-num" value=0 readonly=true>
                <button id="repas-vege-plus">+</button>
            </span>
        </span>
    </div>
    `
    this.repas_boxes["restants"] = this.addRepasBox("restants")
    this.renderRepasBoxes("restants", this.repas_restants)
    this.initRepas("omni")
    this.initRepas("flex")
    this.initRepas("vege")
}

Alimentation.prototype.initRepas = function (name) {
    const button_add = document.getElementById("repas-" + name + "-plus")
    button_add.addEventListener("click", () => { this.addRepasCallback(name) })
    const button_remove = document.getElementById("repas-" + name + "-moins")
    button_remove.addEventListener("click", () => { this.removeRepasCallback(name) })
}

Alimentation.prototype.addRepasBox = function (name) {
    const span = document.getElementById("repas-" + name + "-box")
    const repas_boxes = []
    for (let i = 0; i < 14; i++) {
        let repas_box = document.createElement("span")
        repas_box.classList.add("form-repas-box-item")
        repas_boxes.push(repas_box)
        span.appendChild(repas_box)
    }
    return repas_boxes
}

Alimentation.prototype.addRepasCallback = function (name) {
    const num = document.getElementById("repas-" + name + "-num")
    if (num.valueAsNumber < 14 && this.repas_restants > 0) {
        num.valueAsNumber += 1
        this.repas_restants -= 1
        this.renderRepasBoxes();
    }
}

Alimentation.prototype.removeRepasCallback = function (name) {
    const num = document.getElementById("repas-" + name + "-num")
    if (num.valueAsNumber > 0 && this.repas_restants < 14) {
        num.valueAsNumber -= 1
        this.repas_restants += 1
        this.renderRepasBoxes();
    }
}

Alimentation.prototype.renderRepasBoxes = function () {
    const repas_box = document.getElementById("repas-restants-box");
    const nb_omni = document.getElementById("repas-omni-num").valueAsNumber;
    const nb_flex = document.getElementById("repas-flex-num").valueAsNumber;
    const nb_vege = document.getElementById("repas-vege-num").valueAsNumber;
    for (let i = 0; i < 14; i++) {
        if (i < nb_omni) {
            repas_box.childNodes[i+1].textContent = "🥩";
        } else if (i < (nb_omni + nb_flex)) {
            repas_box.childNodes[i+1].textContent = "🥗";
        } else if (i < (nb_omni + nb_flex + nb_vege)) {
            repas_box.childNodes[i+1].textContent = "🥦"
        } else {
            repas_box.childNodes[i+1].textContent = ""
        }
    }
}

Alimentation.prototype.computeGES = function () {
    return new Promise((resolve, reject) => {
        const regimes = [
            { name: "omni", full_name: "Repas omnivores", intensite: 4.474 / 2 }, // in kg CO2/pers/j
            { name: "flex", full_name: "Repas fléxitariens", intensite: 2.817 / 2 },
            { name: "vege", full_name: "Repas végétariens", intensite: 1.9 / 2 },
        ]
        const ges = {}
        for (regime of regimes) {
            var num = document.getElementById("repas-" + regime.name + "-num")
            ges[regime.full_name] = Math.round(num.valueAsNumber * regime.intensite * 52)
        }
        resolve({ name: "Alimentation", values: ges });
    })

}