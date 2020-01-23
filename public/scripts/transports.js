function Transport(div_id) {
    this.div_id = div_id;

    this.travels = {
        last_id: 0,
        items: []
    }
    this.modes = ["Avion", "Train", "Voiture"]
    this.modes_transit_ges = {
        // From GMaps Directions API
        "RAIL": 25,
        "METRO_RAIL": 3.8,
        "SUBWAY": 3.8,
        "TRAM": 3.1,
        "MONORAIL": 3.1,
        "HEAVY_RAIL": 1.9,
        "COMMUTER_TRAIN": 3.9,
        "HIGH_SPEED_TRAIN": 1.9,
        "LONG_DISTANCE_TRAIN": 1.9,
        "BUS": 95.6,
        "INTERCITY_BUS": 95.6,
        "TROLLEYBUS": 0,
        "SHARE_TAXI": 0,
        "FERRY": 0,
        "CABLE_CAR": 0,
        "GONDOLA_LIFT": 0,
        "FUNICULAR": 0,
        "OTHER": 0
    }
    this.initDiv()
    this.addTravelRow("trajets-hebdos")
    this.addTravelRow("trajets-occasionels")
}

Transport.prototype.initDiv = function () {
    const parent_div = document.getElementById(this.div_id)
    parent_div.innerHTML = (
        `<h2>Votre semaine type</h2>
        <p>Quels sont les trajets que vous effectuez chaque semaine ? Par exemple :</p>
        <ul> 
            <li>5 A/R domicile/travail en bus,</li>
            <li>2 A/R domicile/salle de sport en voiture,</li>
            <li>etc.</li>
        </ul>
        <div id="trajets-hebdos" class="transport-form"></div>
        <table class="table-button"><tr>
            <td><input type="button" value="Ajouter" id="add-voyage-hebdos" class="form-button"></td>
        </tr></table>
        <span class="divider"></span>
        <h2>Vos trajets occasionnels</h2>
        <p>Quels sont les trajets que vous réalisez occasionnellement dans l'année ? Par exemple : </p>
        <ul> 
            <li>3 A/R chez mamie en voiture,</li>
            <li>2 Paris/Lyon en TGV,</li>
            <li>1 Paris/New-York en avion,</li>
            <li>etc.</li>
        </ul>
        <div id="trajets-occasionels" class="transport-form"></div>
        <table class="table-button"><tr>
            <td><input type="button" value="Ajouter" id="add-voyage-occas" class="form-button"></td>
        </tr></table>`
    )

    const buttonAddTravelHebdo = document.getElementById('add-voyage-hebdos')
    buttonAddTravelHebdo.addEventListener('click', () => { this.addTravelRow("trajets-hebdos") })

    const buttonAddTravelOccasionel = document.getElementById('add-voyage-occas')
    buttonAddTravelOccasionel.addEventListener('click', () => { this.addTravelRow("trajets-occasionels") })
}


Transport.prototype.addTravelRow = function (form_id) {
    const form = document.getElementById(form_id)
    // New row div
    const div_row = document.createElement('div')
    div_row.className = "transport-form-row"

    // New mode div
    const div_mode = document.createElement('div')
    div_mode.className = "transport-form-row-mode"
    const input_mode = document.createElement('select')
    input_mode.className = "form-input"
    this.modes.forEach((mode) => {
        let option = document.createElement('option')
        option.value = mode
        option.innerText = mode
        input_mode.appendChild(option)
    })
    input_mode.value = "Voiture"
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
    var travel_id = this.travels.last_id // prevent passing reference to last_id
    button_delete.addEventListener('click', () => {
        // Remove HTML tr
        div_row.parentNode.removeChild(div_row)

        // Remove corresponding entry in this.travels object
        for (let i = 0; i < this.travels.items.length; i++) {
            if (this.travels.items[i].travel_id == travel_id) {
                this.travels.items.splice(i, 1)
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
    // Uncomment if default mode is voiture
    //label_passagers.className = 'hidden'
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
        if (input_mode.value === 'Voiture') {
            label_passagers.classList.remove('hidden')
        } else {
            label_passagers.classList.add('hidden')
        }
    })

    this.travels.items.push({
        mode: input_mode,
        depart: autocomplete_depart,
        arrivee: autocomplete_arrivee,
        ar: check_ar,
        freq: input_freq,
        passagers: input_passagers,
        travel_id: travel_id,
        hebdo: (form_id === 'trajets-hebdos' ? true : false)
    })
    this.travels.last_id += 1;
}

Transport.prototype.postProcessGes = function (travel, impact) {
    const name = (
        travel.depart.getPlace().name
        + ' - ' + travel.arrivee.getPlace().name
        + (travel.ar.checked ? ' A/R' : '')
        + ' (' + travel.mode.value + ')'
    )
    const impactFinal = (
        impact
        * (travel.ar.checked ? 2 : 1)
        * travel.freq.value
        * (travel.hebdo ? 47 : 1)
    )
    return { name: name, impact: impactFinal }
}

Transport.prototype.gesAvion = function (travel) {
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
        const distance = this.gcd(depart, arrivee)
        const impact = (
            distance / 100
            * 0.0025 // t fuel /100 km / pax
            / 0.8 // taux d'occupation moyen
            * 3.15 // t CO2 / t fuel
            * 1000 // conversion t -> kg CO2
        )
        return Promise.resolve(this.postProcessGes(travel, impact))
    }
}

Transport.prototype.gesVoiture = function (travel) {
    if (travel.mode.value != 'Voiture') {
        return Promise.reject('Error: trying to compute GES from non car mode')
    } else {
        var direction_service = new google.maps.DirectionsService()
        var pr = new Promise((resolve, reject) => {
            direction_service.route({
                origin: this.getLatLng(travel.depart.getPlace()),
                destination: this.getLatLng(travel.arrivee.getPlace()),
                travelMode: 'DRIVING'
            }, (res, status) => {
                if (res.routes.length > 0) {
                    const impact = (
                        res.routes[0].legs[0].distance.value / 1000 // distance in km
                        * 111 // 111 gCO2 / km en FR
                        / 1000 // conversion g -> kg CO2
                    )
                    resolve(this.postProcessGes(travel, impact))
                }
            })
        })
        return pr
    }
}

Transport.prototype.gesTrain = function (travel) {
    if (travel.mode.value != 'Train') {
        return Promise.reject('Error: trying to compute GES from non train mode')
    } else {
        var direction_service = new google.maps.DirectionsService()
        var depDate = new Date()
        depDate.setHours(0)
        depDate.setMinutes(0)
        depDate.setSeconds(0)
        var pr = new Promise((resolve, reject) => {
            direction_service.route({
                origin: this.getLatLng(travel.depart.getPlace()),
                destination: this.getLatLng(travel.arrivee.getPlace()),
                travelMode: 'TRANSIT',
                transitOptions: { departureTime: depDate },
            }, (res, status) => {
                if (res.routes.length > 0) {
                    var impacts = []
                    res.routes[0].legs[0].steps.forEach(step => {
                        if (step.travel_mode === "TRANSIT") {
                            impacts.push(
                                step.distance.value / 1000 // distance in km
                                * this.modes_transit_ges[step.transit.line.vehicle.type] // gCO2 / km
                                / 1000 // g -> kg CO2
                            )
                        }
                    })
                    const impact = impacts.reduce((a, b) => a + b)
                    resolve(this.postProcessGes(travel, impact))
                }
            })
        })
        return pr
    }
}

Transport.prototype.getLatLng = function (place) {
    return `${place.geometry.location.lat()},${place.geometry.location.lng()}`
}

Transport.prototype.computeGES = function () {
    return new Promise((resolve, reject) => {
        var ges = {}
        var travels_pr = []
        if (this.travels.items.length > 0) {
            // Trajets hebdomadaires -> x 47 semaines sur la fréquence
            for (let i = 0; i < this.travels.items.length; i++) {
                if (this.travels.items[i].depart.getPlace() && this.travels.items[i].arrivee.getPlace()) {
                    switch (this.travels.items[i].mode.value) {
                        case "Avion": travels_pr.push(this.gesAvion(this.travels.items[i])); break;
                        case "Voiture": travels_pr.push(this.gesVoiture(this.travels.items[i])); break;
                        case "Train": travels_pr.push(this.gesTrain(this.travels.items[i])); break;
                        default: console.log(`Cannot find function to compute ges for mode ${this.travels.items[i].mode.value}`)
                    }
                }
            }
            Promise.all(travels_pr)
                .then((values) => {
                    values.forEach(val => {
                        ges[val.name] = Math.round(val.impact)
                    })
                    if (Object.keys(ges).length > 0) {
                        resolve({ name: "Transports", values: ges });
                    } else {
                        resolve({ name: "Transports", values: 0 });
                    }
                })
        }
    })
}

Transport.prototype.gcd = function (depart, arrivee) {
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
