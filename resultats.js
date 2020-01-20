function Resultats(div_id, transport) {
    this.div_id = div_id;
    this.transport = transport;

    this.ges = {}

    this.initDiv()
    this.chart = new Chart(document.getElementById('ges-chart').getContext('2d'), {
        // The type of chart we want to create
        type: 'pie',
    })
}

Resultats.prototype.initDiv = function () {
    const parent_div = document.getElementById(this.div_id)
    parent_div.innerHTML = (
        `<div class="transport-container-form center">
            <h2>Émissions de CO2</h2>
            <input type="button" value="Calculer" id="calculer-ges" class="form-button">
            <div class="chart-ges hidden" id="div-chart">
                <canvas id="ges-chart"></canvas>
            </div>
        </div>`
    )

    const buttonComputeGes = document.getElementById('calculer-ges')
    buttonComputeGes.addEventListener('click', () => { this.getGes() })
}

Resultats.prototype.getGes = function() {
    Promise.all([
        this.transport.computeGES()
    ])
    .then((values) => {
        values.forEach(val => {
            console.log(val)
            this.ges[val.name] = val.values
        })
        console.log(this.ges)
        this.drawGes();
    })

}

Resultats.prototype.drawGes = function() {
    var ges_by_mode = {}
    for (const mode in this.ges) {
        ges_by_mode[mode] = Object.values(this.ges[mode]).reduce((a, b) => a + b)
    }

    const colors = []
    for (let i = 0; i < Object.keys(ges_by_mode).length; i++) {
        colors.push(this.getRandomColor())
    }

    this.chart.clear();
    this.chart.data.labels = Object.keys(ges_by_mode)
    this.chart.options = {
        responsive: true,
        maintainAspectRatio: false
    }
    this.chart.data.datasets = [{
        label: 'GES emissions',
        data: Object.values(ges_by_mode),
        backgroundColor: colors
    }]
    this.chart.update()
    const div_chart = document.getElementById('div-chart')
    div_chart.classList.remove('hidden')
}

Resultats.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}