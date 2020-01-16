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
            '<div class="test">'
            + '<h2>Vos trajets</h2>'
            + '<table id="trajets">'
            + '</table>'
            + '<table class="table-button"><tr>'
            + '<td><input type="button" value="Ajouter" id="add-voyage"></td>'
            + '<td><input type="button" value="Calculer" id="calculer-ges"></td>'
            + '</tr></table>'
            + '</div>'
            + '<div class="test" id="div-chart" hidden="true">'
            + '<h2>Vos émissions</h2>'
            + '<canvas id="ges-chart"></canvas>'
            + '</div>'
        )
    }

    function addTravelRow() {
        const table = document.getElementById("trajets")
        const tr = document.createElement('tr')

        const td_mode = document.createElement('td')
        const input_mode = document.createElement('select')
        var modes = ['Avion', 'Voiture', 'Train']
        modes.forEach((mode) => {
            let option = document.createElement('option')
            option.value = mode
            option.innerText = mode
            input_mode.appendChild(option)
        })
        td_mode.appendChild(input_mode)
        tr.appendChild(td_mode)


        const td_depart = document.createElement('td')
        const input_depart = document.createElement('input')
        input_depart.type = 'text'
        input_depart.placeholder = 'Départ'
        autocomplete_depart = new google.maps.places.Autocomplete(input_depart)
        td_depart.appendChild(input_depart)
        tr.appendChild(td_depart)

        const td_arrivee = document.createElement('td')
        const input_arrivee = document.createElement('input')
        input_arrivee.type = 'text'
        input_arrivee.placeholder = 'Arrivée'
        autocomplete_arrivee = new google.maps.places.Autocomplete(input_arrivee)
        td_arrivee.appendChild(input_arrivee)
        tr.appendChild(td_arrivee)

        const td_ar = document.createElement('td')
        const label_ar = document.createElement('label')
        const check_ar = document.createElement('input')
        check_ar.type = 'checkbox'
        check_ar.checked = true
        label_ar.appendChild(check_ar)
        label_ar.appendChild(document.createTextNode('A/R'))
        td_ar.appendChild(label_ar)
        tr.appendChild(td_ar)

        const td_freq = document.createElement('td')
        const input_freq = document.createElement('input')
        input_freq.type = 'number'
        input_freq.min = 1
        input_freq.step = 1
        input_freq.value = 1
        td_freq.appendChild(input_freq)
        tr.appendChild(td_freq)

        const td_delete = document.createElement('td')
        const button_delete = document.createElement('input')
        button_delete.type = 'button'
        button_delete.value = 'X'
        var travel_id = travel_last_id // prevent passing reference to travel_last_id
        button_delete.addEventListener('click', () => {
            // Remove HTML tr
            tr.parentNode.removeChild(tr)

            // Remove corresponding entry in travels object
            for (let i = 0; i < travels.length; i++) {
                if (travels[i].travel_id == travel_id) {
                    travels.splice(i, 1)
                }
            }
        })
        td_delete.appendChild(button_delete)
        tr.appendChild(td_delete)

        table.appendChild(tr)

        travels.push({
            mode: input_mode,
            depart: autocomplete_depart,
            arrivee: autocomplete_arrivee,
            ar: check_ar,
            freq: input_freq,
            travel_id: travel_last_id
        })
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
            const impact = distance * (travel.ar.checked ? 2 : 1)
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
                            res.routes[0].legs[0].distance.value / 1000
                            * (travel.ar.checked ? 2 : 1)
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
                            * (travel.ar.checked ? 2 : 1)
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
                    console.log(values)
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
