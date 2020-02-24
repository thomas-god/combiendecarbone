function Alimentation(div_id) {
  this.div_id = div_id;
  this.repas_boxes = {};
  this.repas_restants = 14;
  this.regime_custom = false;
  this.repas = [
    {
      name: "viande-rouge",
      full_name: "Classique avec viande rouge",
      icone: "🥩🥩",
      value: 6290 / 1000,
      count: 0
    },
    {
      name: "viande-blanche",
      full_name: "Classique avec viande blanche",
      icone: "🍗🍗",
      value: 1350 / 1000,
      count: 0
    },
    {
      name: "vegetal-viande-rouge",
      full_name: "Végétal avec viande rouge",
      icone: "🥗🥩",
      value: 2010 / 1000,
      count: 0
    },
    {
      name: "vegetal-viande-blanche",
      full_name: "Végétal avec viande blanche",
      icone: "🥗🍗",
      value: 800 / 1000,
      count: 0
    },
    {
      name: "vegetarien",
      full_name: "Végétarien",
      icone: "🥗🥦",
      value: 510 / 1000,
      count: 0
    }
  ];
  this.initDiv();
}

/**
 * Initialize the Alimentation form: add the html template, generate the
 * form and all callbacks for inputs.
 */
Alimentation.prototype.initDiv = function() {
  const div = document.getElementById(this.div_id);
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

    <h3>Votre régime alimentaire</h3>
    <div class="form-repas">
      <label>
        Votre régime alimentaire
        <select id="repas-regime" class="form-input">
          <option value="" selected disabled=true>----</option>
          <option value="classique">Classique</option>
          <option value="flexitarien">Fléxitarien</option>
          <option value="vegetarien">Végétarien</option>
          <option value="custom">Personnalisé</option>
        </select>
      </label>
    </div>

    <h3 id="repas-form-title" class="disp-none">Votre semaine type (en 14 repas)</h3>
    <div id="repas-form" class="form-repas disp-none">
      <span id="repas-box" class="form-repas-box">
      </span>
    </div>
  `;

  const select = document.getElementById("repas-regime");
  select.addEventListener("input", event => {
    this.defaultRegimesCallback(event);
  });

  this.repas_boxes["restants"] = this.addRepasBox();
  const form_div = document.getElementById("repas-form");
  for (const repas of this.repas) {
    form_div.appendChild(this.createSingleRepasSpan(repas));
  }
  let buttonReset = document.createElement("button");
  buttonReset.classList.add("form-input");
  buttonReset.textContent = "Réinitialiser";
  buttonReset.addEventListener("click", () => this.resetRepas());
  form_div.appendChild(buttonReset);
  this.renderRepasBoxes();
};

/**
 * Callback to be executed when the user select a regime from the select.
 * Will populate the repas box whith the corresponding amount of each meal
 * type depending on the regime chosen.
 */
Alimentation.prototype.defaultRegimesCallback = function(event) {
  let regime = event.target.value;
  let newRepas = {};
  this.repas.forEach(repas => (newRepas[repas.name] = 0));
  switch (regime) {
    case "classique": {
      newRepas["viande-rouge"] = 14;
      break;
    }
    case "flexitarien": {
      newRepas["vegetal-viande-blanche"] = 14;
      break;
    }
    case "vegetarien": {
      newRepas["vegetarien"] = 14;
      break;
    }
    case "custom": {
      const div_form = document.getElementById("repas-form");
      div_form.classList.remove("disp-none");
      const title = document.getElementById("repas-form-title");
      title.classList.remove("disp-none");
      break;
    }
  }
  if (regime !== "custom") {
    this.regime_custom = true;
    this.resetRepas();
    for ([key, value] of Object.entries(newRepas)) {
      let button = document.getElementById("repas__" + key + "__add");
      for (let i = 0; i < value; i++) {
        button.click();
      }
    }
    this.regime_custom = false;
  }
};

/**
 * Add a span for a meal type, containing label, buttons and link to this.repas.
 */
Alimentation.prototype.createSingleRepasSpan = function(repas) {
  let span = document.createElement("span");
  span.id = "repas__" + repas.name;
  span.classList.add("form-repas-controls");

  let label = document.createElement("label");
  label.appendChild(
    document.createTextNode(repas.full_name + " " + repas.icone)
  );
  span.appendChild(label);

  let span_controls = document.createElement("span");

  let button_del = document.createElement("button");
  button_del.id = span.id + "__del";
  button_del.textContent = "-";
  span_controls.appendChild(button_del);

  let input_num = document.createElement("input");
  input_num.type = "number";
  input_num.id = span.id + "__num";
  input_num.value = 0;
  input_num.readOnly = true;
  repas.count = input_num.valueAsNumber;
  span_controls.appendChild(input_num);

  let button_add = document.createElement("button");
  button_add.id = span.id + "__add";
  button_add.textContent = "+";
  span_controls.appendChild(button_add);
  span.appendChild(span_controls);

  button_del.addEventListener("click", event => {
    this.removeRepasCallback(repas, input_num.id);
  });
  button_add.addEventListener("click", event => {
    this.addRepasCallback(repas, input_num.id);
  });

  return span;
};

/**
 * Create the 14 boxes to hold the user's custom week meals.
 */
Alimentation.prototype.addRepasBox = function() {
  const span = document.getElementById("repas-box");
  const repas_boxes = [];
  for (let i = 0; i < 14; i++) {
    let repas_box = document.createElement("span");
    repas_box.classList.add("form-repas-box-item");
    repas_boxes.push(repas_box);
    span.appendChild(repas_box);
  }
  return repas_boxes;
};

/**
 * Callback when adding a new meal to the week's meal list.
 * Check if ther is enough meal left before adding a new one.
 */
Alimentation.prototype.addRepasCallback = function(repas, input_id) {
  const num = document.getElementById(input_id);
  if (num.valueAsNumber < 14 && this.repas_restants > 0) {
    num.valueAsNumber += 1;
    repas.count += 1;
    this.repas_restants -= 1;
    this.renderRepasBoxes();
    if (!this.regime_custom) {
      this.setSelectToCustom();
    }
  }
};

/**
 * Callback when removing a new meal from the week's meal list.
 * Check to avoid negative number of meals.
 */
Alimentation.prototype.removeRepasCallback = function(repas, input_id) {
  const num = document.getElementById(input_id);
  if (num.valueAsNumber > 0 && this.repas_restants < 14) {
    num.valueAsNumber -= 1;
    repas.count -= 1;
    this.repas_restants += 1;
    this.renderRepasBoxes();
    if (!this.regime_custom) {
      this.setSelectToCustom();
    }
  }
};

/**
 * Reset all meals counts.
 */
Alimentation.prototype.resetRepas = function() {
  for (let repas of this.repas) {
    let button_del = document.getElementById("repas__" + repas.name + "__del");
    while (repas.count > 0) {
      button_del.click();
    }
  }
};

/**
 *
 */
Alimentation.prototype.setSelectToCustom = function() {
  const select = document.getElementById("repas-regime");
  select.value = "custom";
};

/**
 * Render the repas box (i.e. display the emojis of this.repas.icone) based on
 * meals in the user's custome meal week.
 */
Alimentation.prototype.renderRepasBoxes = function() {
  const repas_box = document.getElementById("repas-box");
  let i = 0;
  for (const repas of this.repas) {
    for (let j = 0; j < repas.count; j++) {
      repas_box.childNodes[i + 1].textContent = repas.icone;
      i += 1;
    }
  }
  for (let j = i; j < 14; j++) {
    repas_box.childNodes[i + 1].textContent = "";
    i += 1;
  }
};

/**
 * Compute the yearly amount of GHG using the user's meal week.
 */
Alimentation.prototype.computeGES = function() {
  return new Promise((resolve, reject) => {
    const ges = {};
    for (repas of this.repas) {
      let name = "Repas " + repas.full_name.toLowerCase();
      ges[name] = Math.round(repas.count * repas.value * 52);
    }
    resolve({ name: "Alimentation", values: ges });
  });
};
