function add_transports_div(div_id) {
    const travels_hebdos = []
    const travels_occas = []
    var travel_hebdo_last_id = 0
    var travel_occas_last_id = 0
    buildForm(div_id)
    addTravelRow("trajets-hebdos", travels_hebdos, travel_hebdo_last_id)
    addTravelRow("trajets-occasionels", travels_occas, travel_occas_last_id)
    var chart = initChart()

    const buttonAddTravelHebdo = document.getElementById('add-voyage-hebdos')
    buttonAddTravelHebdo.addEventListener('click', () => {addTravelRow("trajets-hebdos", travels_hebdos, travel_hebdo_last_id)})

    const buttonAddTravelOccasionel = document.getElementById('add-voyage-occas')
    buttonAddTravelOccasionel.addEventListener('click', () => {addTravelRow("trajets-occasionels", travels_occas, travel_occas_last_id)})

    const buttonComputeGES = document.getElementById('calculer-ges')
    buttonComputeGES.addEventListener('click', computeGES)

    return [travels_hebdos, travels_occas]

    function buildForm(div_id) {
        const parent_div = document.getElementById(div_id)
        parent_div.innerHTML = (
            `<div class="transport-container-form">
                <h2>Trajets hebdomadaires</h2>
                <div id="trajets-hebdos" class="transport-form">
                </div>
                <table class="table-button"><tr>
                    <td><input type="button" value="Ajouter" id="add-voyage-hebdos" class="form-button"></td>
                </tr></table>
            </div>
            <div class="transport-container-form">
                <h2>Trajets occasionnels</h2>
                <div id="trajets-occasionels" class="transport-form">
                </div>
                <table class="table-button"><tr>
                    <td><input type="button" value="Ajouter" id="add-voyage-occas" class="form-button"></td>
                </tr></table>
            </div>
            <div class="transport-container-form center">
                <h2>Émissions de CO2</h2>
                <input type="button" value="Calculer" id="calculer-ges" class="form-button">
                <div class="chart-ges hidden" id="div-chart">
                    <canvas id="ges-chart"></canvas>
                </div>
            </div>`
        )
    }

    function addTravelRow(form_id, travels, travel_last_id) {
        const form = document.getElementById(form_id)
        // New row div
        const div_row = document.createElement('div')
        div_row.className = "transport-form-row"

        // New mode div
        const div_mode = document.createElement('div')
        div_mode.className = "transport-form-row-mode"
        const input_mode = document.createElement('select')
        input_mode.className = "form-input"
        var modes = ['Avion', 'Voiture', 'Train']
        modes.forEach((mode) => {
            let option = document.createElement('option')
            option.value = mode
            option.innerText = mode
            input_mode.appendChild(option)
        })
        div_mode.appendChild(input_mode)
        div_row.appendChild(div_mode)

        // New inputs div
        const div_inputs = document.createElement('div')
        div_inputs.className = "transport-form-row-inputs"
        // New inputs div row1
        const div_inputs_row1 = document.createElement('div')
        div_inputs_row1.className = "transport-form-row-inputs-row1"
        const input_depart = document.createElement('input')
        input_depart.type = 'text'
        input_depart.placeholder = 'Départ'
        input_depart.className = 'form-input'
        autocomplete_depart = new google.maps.places.Autocomplete(input_depart)
        div_inputs_row1.appendChild(input_depart)

        const input_arrivee = document.createElement('input')
        input_arrivee.type = 'text'
        input_arrivee.placeholder = 'Arrivée'
        input_arrivee.className = 'form-input'
        autocomplete_arrivee = new google.maps.places.Autocomplete(input_arrivee)
        div_inputs_row1.appendChild(input_arrivee)

        const button_delete = document.createElement('input')
        button_delete.type = 'button'
        button_delete.value = 'Suppr.'
        button_delete.className = 'form-input'
        var travel_id = travel_last_id // prevent passing reference to travel_last_id
        button_delete.addEventListener('click', () => {
            // Remove HTML tr
            div_row.parentNode.removeChild(div_row)

            // Remove corresponding entry in travels object
            for (let i = 0; i < travels.length; i++) {
                if (travels[i].travel_id == travel_id) {
                    travels.splice(i, 1)
                }
            }
        })
        div_inputs_row1.appendChild(button_delete)
        div_inputs.appendChild(div_inputs_row1)
        // New inputs div row2
        const div_inputs_row2 = document.createElement('div')
        div_inputs_row2.className = "transport-form-row-inputs-row2"
        const label_ar = document.createElement('label')
        label_ar.appendChild(document.createTextNode('A/R'))
        const check_ar = document.createElement('input')
        check_ar.type = 'checkbox'
        check_ar.checked = true
        check_ar.className = 'form-input'
        label_ar.appendChild(check_ar)
        div_inputs_row2.appendChild(label_ar)

        const label_freq = document.createElement('label')
        label_freq.appendChild(document.createTextNode('Fréquence'))
        const input_freq = document.createElement('input')
        input_freq.className = 'form-input'
        input_freq.type = 'number'
        input_freq.min = 1
        input_freq.step = 1
        input_freq.value = (form_id === 'trajets-hebdos' ? 5 : 1)
        label_freq.appendChild(input_freq)
        div_inputs_row2.appendChild(label_freq)

        const label_passagers = document.createElement('label')
        label_passagers.className = 'hidden'
        label_passagers.appendChild(document.createTextNode('Passagers'))
        const input_passagers = document.createElement('input')
        input_passagers.className = 'form-input'
        input_passagers.type = 'number'
        input_passagers.min = 1
        input_passagers.step = 1
        input_passagers.value = 1
        label_passagers.appendChild(input_passagers)
        div_inputs_row2.appendChild(label_passagers)
        div_inputs.appendChild(div_inputs_row2)

        div_row.appendChild(div_inputs)
        form.appendChild(div_row)

        input_mode.addEventListener("change", () => {
            if(input_mode.value === 'Voiture') {
                label_passagers.classList.remove('hidden')
            } else {
                label_passagers.classList.add('hidden')
            }
        })

        travels.push({
            mode: input_mode,
            depart: autocomplete_depart,
            arrivee: autocomplete_arrivee,
            ar: check_ar,
            freq: input_freq,
            passagers: input_passagers,
            travel_id: travel_last_id,
            hebdo: (form_id === 'trajets-hebdos' ? true : false)
        })
        travel_last_id = travel_last_id + 1;
    }

    function gesAvion(travel) {
        if (travel.mode.value != 'Avion') {
            return Promise.reject('Error: trying to compute GES from non avion mode')
        } else {
            const depart = {
                lat: travel.depart.getPlace().geometry.location.lat(),
                lng: travel.depart.getPlace().geometry.location.lng()
            }
            const arrivee = {
                lat: travel.arrivee.getPlace().geometry.location.lat(),
                lng: travel.arrivee.getPlace().geometry.location.lng()
            }
            const distance = gcd(depart, arrivee)
            const impact = (
                distance / 100
                * 0.0025 // t fuel /100 km / pax
                / 0.8 // taux d'occupation moyen
                * 3.15 // t CO2 / t fuel
                * 1000 // conversion t -> kg CO2
                * (travel.ar.checked ? 2 : 1)
                * travel.freq.value
                * (travel.hebdo ? 47 : 1)
            )
            const name = (
                travel.depart.getPlace().name
                + ' - ' + travel.arrivee.getPlace().name
                + (travel.ar.checked ? ' A/R' : '')
                + ' (' + travel.mode.value + ')'
            )
            return Promise.resolve({ name: name, impact: impact })
        }
    }

    function gesVoiture(travel) {
        if (travel.mode.value != 'Voiture') {
            return Promise.reject('Error: trying to compute GES from non car mode')
        } else {
            var direction_service = new google.maps.DirectionsService()
            var pr = new Promise((resolve, reject) => {
                direction_service.route({
                    origin: travel.depart.getPlace().name,
                    destination: travel.arrivee.getPlace().name,
                    travelMode: 'DRIVING'
                }, (res, status) => {
                    if (res.routes.length > 0) {
                        const name = (
                            travel.depart.getPlace().name
                            + ' - ' + travel.arrivee.getPlace().name
                            + (travel.ar.checked ? ' A/R' : '')
                            + ' (' + travel.mode.value + ')'
                        )
                        const impact = (
                            res.routes[0].legs[0].distance.value / 1000 // distance in km
                            * 111 // 111 gCO2 / km en FR
                            / 1000 // conversion g -> kg CO2
                            * (travel.ar.checked ? 2 : 1)
                            * travel.freq.value
                            / travel.passagers.value
                            * (travel.hebdo ? 47 : 1)
                        )
                        resolve({ name: name, impact: impact })
                    }
                })
            })
            return pr
        }
    }

    function gesTrain(travel) {
        if (travel.mode.value != 'Train') {
            return Promise.reject('Error: trying to compute GES from non train mode')
        } else {
            var direction_service = new google.maps.DirectionsService()
            var pr = new Promise((resolve, reject) => {
                direction_service.route({
                    origin: travel.depart.getPlace().name,
                    destination: travel.arrivee.getPlace().name,
                    travelMode: 'DRIVING'
                }, (res, status) => {
                    if (res.routes.length > 0) {
                        const name = (
                            travel.depart.getPlace().name
                            + ' - ' + travel.arrivee.getPlace().name
                            + (travel.ar.checked ? ' A/R' : '')
                            + ' (' + travel.mode.value + ')'
                        )
                        const impact = (
                            res.routes[0].legs[0].distance.value / 1000
                            * 1.9 // gCO2 / km
                            / 1000 // g -> kg CO2
                            * (travel.ar.checked ? 2 : 1)
                            * travel.freq.value
                            * (travel.hebdo ? 47 : 1)
                        )
                        resolve({ name: name, impact: impact })
                    }
                })
            })
            return pr
        }
    }

    async function computeGES() {
        console.log(travels_occas, travels_hebdos)
        ges = {}
        travels_pr = []
        if (travels_occas.length > 0 || travels_hebdos.length > 0) {
            // Trajets occasionnels
            for (let i = 0; i < travels_occas.length; i++) {
                if (travels_occas[i].depart.getPlace() && travels_occas[i].arrivee.getPlace()) {
                    if (travels_occas[i].mode.value === 'Avion') {
                        travels_pr.push(gesAvion(travels_occas[i]))
                    } else if (travels_occas[i].mode.value === 'Voiture') {
                        travels_pr.push(gesVoiture(travels_occas[i]))
                    } else if (travels_occas[i].mode.value === 'Train') {
                        travels_pr.push(gesTrain(travels_occas[i]))
                    }
                }
            }
            // Trajets hebdomadaires -> x 47 semaines sur la fréquence
            for (let i = 0; i < travels_hebdos.length; i++) {
                if (travels_hebdos[i].depart.getPlace() && travels_hebdos[i].arrivee.getPlace()) {
                    if (travels_hebdos[i].mode.value === 'Avion') {
                        travels_pr.push(gesAvion(travels_hebdos[i]))
                    } else if (travels_hebdos[i].mode.value === 'Voiture') {
                        travels_pr.push(gesVoiture(travels_hebdos[i]))
                    } else if (travels_hebdos[i].mode.value === 'Train') {
                        travels_pr.push(gesTrain(travels_hebdos[i]))
                    }
                }
            }
            Promise.all(travels_pr)
                .then((values) => {
                    var ges = {}
                    values.forEach(val => {
                        ges[val.name] = val.impact
                    })
                    if (Object.keys(ges).length > 0) {
                        console.log(ges)
                        drawGes(chart, ges)
                    }
                })
        }
    }

    function initChart() {
        return new Chart(document.getElementById('ges-chart').getContext('2d'), {
            // The type of chart we want to create
            type: 'pie',
        })
    }
    function drawGes(chart, ges) {
        // TODO: properly handle graph refresh
        const colors = []
        for (let i = 0; i < Object.keys(ges).length; i++) {
            colors.push(getRandomColor())
        }

        chart.clear();
        chart.data.labels = Object.keys(ges)
        chart.options = {
            responsive: true,
            maintainAspectRatio: false
        }
        chart.data.datasets = [{
            label: 'GES emissions',
            data: Object.values(ges),
            backgroundColor: colors
        }]
        chart.update()
        const div_chart = document.getElementById('div-chart')
        div_chart.classList.remove('hidden')

    }

    function gcd(depart, arrivee) {
        const R = 6371 // Earth radius, in km

        const lat1 = depart.lat * Math.PI / 180;
        const lng1 = depart.lng * Math.PI / 180;
        const lat2 = arrivee.lat * Math.PI / 180;
        const lng2 = arrivee.lng * Math.PI / 180;

        const dlat = Math.abs(lat1 - lat2)
        const dlng = Math.abs(lng1 - lng2)

        const dsigma = 2 * Math.asin(Math.sqrt(
            Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2)
        ))
        return Math.round(dsigma * R)
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
