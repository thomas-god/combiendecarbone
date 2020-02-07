function Consommation(div_id) {
    this.div_id = div_id;


    this.vetements = [
        {name: "jeans", full_name: "Jeans", ges: 25},
        {name: "tee-shirt", full_name: "Tee-shirt", ges: 7},
        {name: "chemise", full_name: "Chemise", ges: 13},
        {name: "pull-acrylique", full_name: "Pull acrylique", ges: 28},
        {name: "pull-laine", full_name: "Pull laine", ges: 56},
        {name: "sweat-coton", full_name: "Sweat coton", ges: 31},
        {name: "robe", full_name: "Robe", ges: 56},
        {name: "manteau", full_name: "Manteau", ges: 89},
        {name: "chaussure", full_name: "Chaussures", ges: 19},
    ]
    this.high_tech =  [
        {name: "smartphone", full_name: "Smartphone", ges: 30},
        {name: "portable", full_name: "Ordinateur portable", ges: 156},
        {name: "fixe", full_name: "Ordinateur fixe", ges: 200},
        {name: "tele", full_name: "Télévision", ges: 350},
    ]
    this.electromenager =  [
        {name: "four", full_name: "Four", ges: 217},
        {name: "lave-vaisselle", full_name: "Lave-vaisselle", ges: 253},
        {name: "lave-linge", full_name: "Lave-linge", ges: 320},
        {name: "frigo", full_name: "Réfrigérateur", ges: 257},
    ]
    this.initDiv();
}

Consommation.prototype.initDiv = function() {
    const div = document.getElementById(this.div_id);

    div.innerHTML = `
    <h3>Vos habitudes de consommation</h3>
    <p>Les objects que nous achetons participent indirectement à nos émissions puisque leurs procédés de fabrication et leur transports sont bien souvent très émetteurs. Nous avons considéré 3 catégories d'objets: les vêtements, les objets high-tech et l'électroménager.</p>
    <p>Pour les vêtements il vous suffit de renseigner combien vous achetez de chaque type par an.</p>
    <p>Pour les objets high-tech et l'électroménager renseigner combien d'années vous gardez en moyenne chaque produit.</p>
    <div class="form-conso">
        <h3>Vêtements</h3>
            <ul id="conso-form-vetements">
            </ul>
        <h3>High-tech</h3>
            <ul id="conso-form-hightech">
            </ul>
        <h3>Electroménager</h3>
            <ul id="conso-form-electromenager">
            </ul>
    </div>
    `

    // Vetements part: nb d'items achetés dans l'année
    this.createFormInput("conso-form-vetements", "Nombre acheté", this.vetements);

    // High-tech et electromenager parts: durée de renouvellement
    this.createFormInput("conso-form-hightech", "Durée de renouvellement", this.high_tech);
    this.createFormInput("conso-form-electromenager", "Durée de renouvellement", this.electromenager);
    
}

Consommation.prototype.createFormInput = function(ul_id, placeholder, itemsList) {
    const ul_vet = document.getElementById(ul_id);
    for (item of itemsList) {
        let li = document.createElement("li");
        let label = document.createElement("label");
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(item.full_name));
        label.appendChild(p);
        let input = document.createElement("input");
        input.type = "number";
        input.placeholder = placeholder;
        label.appendChild(input);
        li.appendChild(label);
        ul_vet.appendChild(li)
        item.value = input;
    }
}

Consommation.prototype.computeGES = function() {
    return new Promise((resolve, reject) => {
        const categories = [
            {name: "vetements", full_name: "Vêtements", subItems:this.vetements}, 
            {name: "high_tech", full_name: "High-tech", subItems:this.high_tech},
            {name: "electromenager", full_name: "Électroménager", subItems:this.electromenager},
        ]
        const ges = {}
        for (cat of categories) {
            let catGes = 0;
            for (item of cat.subItems) {
                if (item.value.valueAsNumber > 0){
                    catGes += item.ges * ((cat.name === "vetements") ? item.value.valueAsNumber: 1/item.value.valueAsNumber);
                }
            }
            ges[cat.full_name] = Math.round(catGes)
        }
        resolve({ name: "Consommation", values: ges });
    })
}