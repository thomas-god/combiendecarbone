function Alimentation (div_id) {
    this.div_id = div_id;
    this.repas_boxes = {}
    this.repas_restants = 14;
    this.initDiv();
}

Alimentation.prototype.initDiv = function () {
    const div = document.getElementById(this.div_id)
    div.innerHTML = `
    <h2> Vos habitudes alimentaires hebdomadaires</h2>
    <span id="repas-total" class="repas-form">
        <label>Repas restants</label>
        <span id="repas-restants-box" class="repas">
        </span>
    </span>
    <span id="repas-omni" class="repas-form">
        <label>Repas omnivores</label>
        <span id="repas-omni-box" class="repas">
        </span>
        <span class="repas-form-controls">
            <button id="repas-omni-moins">-</button>
            <input type="number" id="repas-omni-num" value=0 readonly=true>
            <button id="repas-omni-plus">+</button>
        </span>
    </span>
    <span id="repas-flex" class="repas-form">
        <label>Repas fléxitariens</label>
        <span id="repas-flex-box" class="repas">
        </span>
        <span class="repas-form-controls">
            <button id="repas-flex-moins">-</button>
            <input type="number" id="repas-flex-num" value=0 readonly=true>
            <button id="repas-flex-plus">+</button>
        </span>
    </span>
    <span id="repas-vege" class="repas-form">
        <label>Repas végétariens</label>
        <span id="repas-vege-box" class="repas">
        </span>
        <span class="repas-form-controls">
            <button id="repas-vege-moins">-</button>
            <input type="number" id="repas-vege-num" value=0 readonly=true>
            <button id="repas-vege-plus">+</button>
        </span>
    </span>
    `
    this.repas_boxes["restants"] = this.addRepasBox("restants")
    this.renderRepasBoxes("restants", this.repas_restants)
    this.initRepas("omni")
    this.initRepas("flex")
    this.initRepas("vege")
}

Alimentation.prototype.initRepas = function(name) {
    this.repas_boxes[name] = this.addRepasBox(name)
    const button_add = document.getElementById("repas-" + name + "-plus")
    button_add.addEventListener("click", () => {this.addRepasCallback(name)})
    const button_remove = document.getElementById("repas-" + name + "-moins")
    button_remove.addEventListener("click", () => {this.removeRepasCallback(name)})
}

Alimentation.prototype.addRepasBox = function(name) {
    const span = document.getElementById("repas-" + name + "-box")
    const repas_boxes = []
    for(let i = 0; i < 14; i++) {
        let repas_box = document.createElement("span")
        repas_box.classList.add("repas-box")
        repas_boxes.push(repas_box)
        span.appendChild(repas_box)
    }
    return repas_boxes
}

Alimentation.prototype.addRepasCallback = function(name) {
    const num = document.getElementById("repas-" + name + "-num")
    if (num.valueAsNumber < 14 && this.repas_restants > 0) {
        num.valueAsNumber += 1
        this.repas_restants -= 1
        this.renderRepasBoxes(name, num.valueAsNumber)
        this.renderRepasBoxes("restants", this.repas_restants)
    }
}

Alimentation.prototype.removeRepasCallback = function(name) {
    const num = document.getElementById("repas-" + name + "-num")
    if (num.valueAsNumber > 0 && this.repas_restants < 14) {
        num.valueAsNumber -= 1
        this.repas_restants += 1
        this.renderRepasBoxes(name, num.valueAsNumber)
        this.renderRepasBoxes("restants", this.repas_restants)
    }
}

Alimentation.prototype.renderRepasBoxes = function(name, nb) {
    for (let i = 0; i < 14; i++) {
        if (i < nb) {
            this.repas_boxes[name][i].classList.add("repas-box-selected")
        } else {
            this.repas_boxes[name][i].classList.remove("repas-box-selected")
        }
    }
}

Alimentation.prototype.computeGES = function() {
    return new Promise((resolve, reject) => {
        const regimes = [
            {name: "omni", full_name: "Repas omnivores", intensite: 4.474/2}, // in kg CO2/pers/j
            {name: "flex", full_name: "Repas fléxitariens", intensite: 2.817/2},
            {name: "vege", full_name: "Repas végétariens", intensite: 1.9/2},
        ]
        const ges = {}
        for (regime of regimes) {
            var num = document.getElementById("repas-" + regime.name + "-num")
            ges[regime.full_name] = Math.round(num.valueAsNumber * regime.intensite * 52)
        }
        resolve({ name: "Alimentation", values: ges });
    })
    
}