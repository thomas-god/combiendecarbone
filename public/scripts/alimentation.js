function Alimentation(div_id) {
    this.div_id = div_id;
    this.repas_boxes = {}
    this.repas_restants = 14;
    this.initDiv();
}

Alimentation.prototype.initDiv = function () {
    const div = document.getElementById(this.div_id)
    div.innerHTML = `
    <h3>Vos habitudes alimentaires</h3>
    <p>On considère trois régimes alimentaires: le régime omnivore (repas moyen en France), le régime fléxitarien qui limite les produits d'origine animale, et le régime végétarien qui est dépourvu de produits d'origine animale. Construisez votre régime personnel en distribuant les 14 repas de la semaine parmis les trois régimes proposés.</p>
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