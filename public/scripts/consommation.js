function Consommation(div_id) {
    this.div_id = div_id;

    this.initDiv();
}

Consommation.prototype.initDiv = function() {
    const div = document.getElementById(this.div_id);

    div.innerHTML = `
    <h2>Vos habitudes de consommation</h2>
    `


}