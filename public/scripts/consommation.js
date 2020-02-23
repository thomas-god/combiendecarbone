function Consommation(div_id) {
  this.div_id = div_id;

  this.vetements = [
    { name: "jeans", full_name: "Jeans", ges: 25 },
    { name: "tee-shirt", full_name: "Tee-shirt", ges: 7 },
    { name: "chemise", full_name: "Chemise", ges: 13 },
    { name: "pull-acrylique", full_name: "Pull acrylique", ges: 28 },
    { name: "pull-laine", full_name: "Pull laine", ges: 56 },
    { name: "sweat-coton", full_name: "Sweat coton", ges: 31 },
    { name: "robe", full_name: "Robe", ges: 56 },
    { name: "manteau", full_name: "Manteau", ges: 89 },
    { name: "chaussure", full_name: "Chaussures", ges: 19 }
  ];
  this.high_tech = [
    { name: "smartphone", full_name: "Smartphone", ges: 30 },
    { name: "portable", full_name: "Ordinateur portable", ges: 156 },
    { name: "fixe", full_name: "Ordinateur fixe", ges: 200 },
    { name: "tele", full_name: "Télévision", ges: 350 }
  ];
  this.electromenager = [
    { name: "four", full_name: "Four", ges: 217 },
    { name: "lave-vaisselle", full_name: "Lave-vaisselle", ges: 253 },
    { name: "lave-linge", full_name: "Lave-linge", ges: 320 },
    { name: "frigo", full_name: "Réfrigérateur", ges: 257 }
  ];
  this.initDiv();
}

Consommation.prototype.initDiv = function() {
  const div = document.getElementById(this.div_id);

  div.innerHTML = `
    <h3>Consommation de biens manufacturés</h3>
    <p>L'industrie est à l'origine d'environ <a href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf#page=38" target="_blank">20%</a> des émissions de gaz à effet de serre en France. De la fabrication des matières premières (béton, acier) à l'assemblage et aux transport des produits finis, l'achat d'un objet représente donc une source d'émissions indirectes, en France ou à l'étranger en cas d'importation.</p>
    <p>Nous avons considéré 3 catégories d'objets: les vêtements, les objets high-tech et l'électroménager. Pour les vêtements il vous suffit de renseigner combien vous achetez de chaque type chaque année. Pour les objets high-tech et l'électroménager que nous gardons plusieurs années, renseigner combien d'années vous gardez en moyenne chaque produit.</p>
    <div class="form-conso">
        <h3>Nombre de vêtements achetés</h3>
            <ul id="conso-form-vetements">
            </ul>
        <h3>Durée de vie de votre high-tech</h3>
            <ul id="conso-form-hightech">
            </ul>
        <h3>Durée de vie de votre électroménager</h3>
            <ul id="conso-form-electromenager">
            </ul>
    </div>
    `;

  // Vetements part: nb d'items achetés dans l'année
  this.createFormInput("conso-form-vetements", "0", this.vetements);

  // High-tech et electromenager parts: durée de renouvellement
  this.createFormInput("conso-form-hightech", "0", this.high_tech);
  this.createFormInput("conso-form-electromenager", "0", this.electromenager);
};

Consommation.prototype.createFormInput = function(
  ul_id,
  placeholder,
  itemsList
) {
  const ul_vet = document.getElementById(ul_id);
  for (item of itemsList) {
    //Number input
    let input = document.createElement("input");
    input.classList.add("form-input");
    input.type = "number";
    input.placeholder = placeholder;
    input.valueAsNumber = 0;
    input.id = `form-conso-${item.name}`;

    // Remove item button
    let remove = document.createElement("button");
    remove.appendChild(document.createTextNode("-"));
    remove.addEventListener("click", () =>
      this.callBackAddRemove(input, "remove")
    );

    // Add item button
    let add = document.createElement("button");
    add.appendChild(document.createTextNode("+"));
    add.addEventListener("click", () => this.callBackAddRemove(input, "add"));

    // Containing span
    let span = document.createElement("span");
    span.appendChild(remove);
    span.appendChild(input);
    span.appendChild(add);

    // Label
    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.appendChild(document.createTextNode(item.full_name));

    // List item
    let li = document.createElement("li");
    li.classList.add("form-conso-controls");
    li.appendChild(label);
    li.appendChild(span);
    ul_vet.appendChild(li);
    item.value = input;
  }
};

Consommation.prototype.callBackAddRemove = function(input, mode) {
  // input.valueAsNumber is NaN when not set
  if (mode === "add") {
    input.valueAsNumber += 1;
  } else if (mode === "remove" && input.valueAsNumber > 0) {
    input.valueAsNumber -= 1;
  }
};

Consommation.prototype.computeGES = function() {
  return new Promise((resolve, reject) => {
    const categories = [
      { name: "vetements", full_name: "Vêtements", subItems: this.vetements },
      { name: "high_tech", full_name: "High-tech", subItems: this.high_tech },
      {
        name: "electromenager",
        full_name: "Électroménager",
        subItems: this.electromenager
      }
    ];
    const ges = {};
    for (cat of categories) {
      let catGes = 0;
      for (item of cat.subItems) {
        if (item.value.valueAsNumber > 0) {
          catGes +=
            item.ges *
            (cat.name === "vetements"
              ? item.value.valueAsNumber
              : 1 / item.value.valueAsNumber);
        }
      }
      ges[cat.full_name] = Math.round(catGes);
    }
    resolve({ name: "Consommation", values: ges });
  });
};
