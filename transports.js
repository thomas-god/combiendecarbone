function add_transports_div(div_id) {
    const travels = []
    var travel_last_id = 0
    buildForm(div_id)
    addTravelRow()

    const buttonAddTravel = document.getElementById('add-voyage')
    buttonAddTravel.addEventListener('click', addTravelRow)

    const buttonComputeGES = document.getElementById('calculer-ges')
    buttonComputeGES.addEventListener('click', computeGES)

    return travels

    function buildForm(div_id) {
        const parent_div = document.getElementById(div_id)
        parent_div.innerHTML = (
            '<div class="transport-container-form">'
            + '<h2>Vos trajets</h2>'
            + '<div id="trajets" class="transport-form">'
            + '</div>'
            + '<table class="table-button"><tr>'
            + '<td><input type="button" value="Ajouter" id="add-voyage" class="form-button"></td>'
            + '<td><input type="button" value="Calculer" id="calculer-ges" class="form-button"></td>'
            + '</tr></table>'
            + '</div>'
            + '<div class="chart-ges" id="div-chart" hidden="true">'
            + '<h2>Vos émissions</h2>'
            + '<canvas id="ges-chart"></canvas>'
            + '</div>'
        )
    }

    function addTravelRow() {
        const form = document.getElementById("trajets")
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
        input_freq.value = 1
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
            travel_id: travel_last_id
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
                        )
                        resolve({ name: name, impact: impact })
                    }
                })
            })
            return pr
        }
    }

    async function computeGES() {
        ges = {}
        travels_pr = []
        if (travels.length > 0) {
            for (let i = 0; i < travels.length; i++) {
                if (travels[i].depart.getPlace() && travels[i].arrivee.getPlace()) {
                    if (travels[i].mode.value === 'Avion') {
                        travels_pr.push(gesAvion(travels[i]))
                    } else if (travels[i].mode.value === 'Voiture') {
                        travels_pr.push(gesVoiture(travels[i]))
                    } else if (travels[i].mode.value === 'Train') {
                        travels_pr.push(gesTrain(travels[i]))
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
                        drawGes(ges)
                    }
                })
        }
    }

    function drawGes(ges) {
        // TODO: properly handle graph refresh
        const colors = []
        for (let i = 0; i < Object.keys(ges).length; i++) {
            colors.push(getRandomColor())
        }
        var chart = new Chart(document.getElementById('ges-chart').getContext('2d'), {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: Object.keys(ges),
                datasets: [{
                    label: 'GES emissions',
                    data: Object.values(ges),
                    backgroundColor: colors
                }]
            }
        })
        const div_chart = document.getElementById('div-chart')
        div_chart.hidden = false
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
