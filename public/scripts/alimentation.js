function Alimentation(div_id) {
  this.div_id = div_id;
  this.repas_boxes = {};
  this.repas_restants = 14;
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

    <h3>Votre semaine type en 14 repas</h3>
    <div id="repas-form" class="form-repas">
        <span id="repas-box" class="form-repas-box">
        </span>
    </div>
    `;
  this.repas_boxes["restants"] = this.addRepasBox();
  const form_div = document.getElementById("repas-form");
  for (const repas of this.repas) {
    form_div.appendChild(this.createSingleRepasSpan(repas));
  }
  this.renderRepasBoxes("restants", this.repas_restants);
};

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

  button_del.addEventListener("click", () => {
    this.removeRepasCallback(repas, input_num.id);
  });
  button_add.addEventListener("click", () => {
    this.addRepasCallback(repas, input_num.id);
  });

  return span;
};

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

Alimentation.prototype.addRepasCallback = function(repas, input_id) {
  const num = document.getElementById(input_id);
  if (num.valueAsNumber < 14 && this.repas_restants > 0) {
    num.valueAsNumber += 1;
    repas.count += 1;
    this.repas_restants -= 1;
    this.renderRepasBoxes();
  }
};

Alimentation.prototype.removeRepasCallback = function(repas, input_id) {
  const num = document.getElementById(input_id);
  if (num.valueAsNumber > 0 && this.repas_restants < 14) {
    num.valueAsNumber -= 1;
    repas.count -= 1;
    this.repas_restants += 1;
    this.renderRepasBoxes();
  }
};

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
