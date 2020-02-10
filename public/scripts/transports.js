function Transport(div_id) {
    this.div_id = div_id;

    this.travels = {
        last_id: 0,
        items: []
    }
    this.modes = ["Voiture", "Métro/Bus", "Vélo", "TGV", "Avion"]
    this.modes_transit_ges = {
        // From GMaps Directions API, gCO2/km
        "RAIL": 8.9,
        "METRO_RAIL": 5.7,
        "SUBWAY": 5.7,
        "TRAM": 6,
        "MONORAIL": 6,
        "HEAVY_RAIL": 3.6,
        "COMMUTER_TRAIN": 8.9,
        "HIGH_SPEED_TRAIN": 3.6,
        "LONG_DISTANCE_TRAIN": 3.6,
        "BUS": 95.6,
        "INTERCITY_BUS": 154,
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
        `
        <h3>Les transports</h3>
        <p>Le secteur des transports est à l'origine d'environ <a href="https://www.statistiques.developpement-durable.gouv.fr/sites/default/files/2019-05/datalab-46-chiffres-cles-du-climat-edition-2019-novembre2018.pdf#page=38">29%</a> des émissions de gaz à effet de serre en France, dont la moitié pour les véhicules particuliers. Ces émissions peuvent être directes (lors de la combustion d'essence dans une voiture) ou indirectes (lors de la production d'électricité pour faire rouler un train). Pour un trajet la quantité de gaz à effet de serre émise va dépendre du <strong>mode utilisé</strong> (voiture, vélo, train, etc.) et de la <strong>distance parcourue</strong>.</p>
        <p>Nous avons découpé vos trajets 2 catégories : vos trajets <strong>réguliers hebdomadaires</strong>, et vos trajets <strong>occasionnels</strong> (lors de vos vacances par exemple).</p>
        <p>Pour les deux catégories vous pouvez ajouter vos trajets via le bouton <em>Ajouter un trajet</em> puis préciser le mode de transport utilisé, les lieux de départ et d'arrivée, si c'est un aller retour et la fréquence de ce trajet (dans la semaine pour les trajets hebdomadaires ou dans l'année pour les trajets occasionnels).</p>
        <h3>Trajets hebdomadaires</h3>
        <div id="trajets-hebdos" class="form-transport-container"></div>
        <input type="button" value="Ajouter un trajet" id="add-voyage-hebdos" class="form-input form-transport-add"></td>

        <span class="divider"></span>
        <h3>Trajets occasionnels</h3>
        <div id="trajets-occasionels" class="form-transport-container"></div>
        <input type="button" value="Ajouter un trajet" id="add-voyage-occas" class="form-input form-transport-add"></td>
        `
    )

    const buttonAddTravelHebdo = document.getElementById('add-voyage-hebdos')
    buttonAddTravelHebdo.addEventListener('click', () => { this.addTravelRow("trajets-hebdos") })

    const buttonAddTravelOccasionel = document.getElementById('add-voyage-occas')
    buttonAddTravelOccasionel.addEventListener('click', () => { this.addTravelRow("trajets-occasionels") })
}


Transport.prototype.addTravelRow = function (form_id) {
    const form = document.getElementById(form_id)
    
    // New item
    const new_item = document.createElement('article')
    new_item.classList.add("form-transport-item");

    // New select mode
    const input_mode = document.createElement('select')
    input_mode.classList.add("form-input", "form-transport-item-mode");
    this.modes.forEach((mode) => {
        let option = document.createElement('option')
        option.value = mode
        option.innerText = mode
        input_mode.appendChild(option)
    })
    input_mode.value = "Voiture"
    new_item.appendChild(input_mode)

    // New inputs depart
    const input_depart = document.createElement('input')
    input_depart.type = 'text'
    input_depart.placeholder = 'Départ'
    autocomplete_depart = new google.maps.places.Autocomplete(input_depart)
    input_depart.classList.add("form-input", "form-transport-item-depart");
    new_item.appendChild(input_depart)

    // New inputs arrivee
    const input_arrivee = document.createElement('input')
    input_arrivee.type = 'text'
    input_arrivee.placeholder = 'Arrivée'
    autocomplete_arrivee = new google.maps.places.Autocomplete(input_arrivee)
    input_arrivee.classList.add("form-input", "form-transport-item-arrivee");
    new_item.appendChild(input_arrivee)


    // New delete button
    const button_delete = document.createElement('input')
    button_delete.type = 'button'
    button_delete.value = 'X'
    button_delete.classList.add("form-input", "form-transport-item-delete");
    var travel_id = this.travels.last_id // prevent passing reference to last_id
    button_delete.addEventListener('click', () => {
        // Remove HTML tr
        new_item.parentNode.removeChild(new_item)

        // Remove corresponding entry in this.travels object
        for (let i = 0; i < this.travels.items.length; i++) {
            if (this.travels.items[i].travel_id == travel_id) {
                this.travels.items.splice(i, 1)
            }
        }
    })
    new_item.appendChild(button_delete)
    
    // New A/R checkbox
    const label_ar = document.createElement('label')
    label_ar.appendChild(document.createTextNode('A/R'))
    const check_ar = document.createElement('input')
    check_ar.type = 'checkbox'
    check_ar.checked = true
    check_ar.classList.add("form-input");
    label_ar.classList.add("form-transport-item-AR");
    label_ar.appendChild(check_ar)
    new_item.appendChild(label_ar)

    const input_freq = document.createElement('input')
    input_freq.type = 'number'
    input_freq.min = 1
    input_freq.step = 1
    input_freq.value = (form_id === 'trajets-hebdos' ? 5 : 1)
    input_freq.classList.add("form-input");
    const label_freq = document.createElement('label')
    label_freq.appendChild(document.createTextNode('Fréquence'))
    label_freq.classList.add("form-transport-item-frequence");
    label_freq.appendChild(input_freq)
    new_item.appendChild(label_freq)

    const label_passagers = document.createElement('label')
    // Uncomment if default mode is voiture
    //label_passagers.className = 'hidden'
    label_passagers.appendChild(document.createTextNode('Passagers'))
    const input_passagers = document.createElement('input')
    label_passagers.classList.add("form-transport-item-passagers");
    input_passagers.type = 'number'
    input_passagers.min = 1
    input_passagers.step = 1
    input_passagers.value = 1
    input_passagers.classList.add("form-input");
    label_passagers.appendChild(input_passagers)
    new_item.appendChild(label_passagers)

    form.appendChild(new_item)

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
        let distance = this.gcd(depart, arrivee)
        if (distance > 5500) {
            distance += 125;
        } else if (distance > 550) {
            distance += 100;
        } else {
            distance += 50;
        }
        const impact = (
            distance 
            * 249.6 // gCO2 per km
            / 1000 // g -> CO2
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
                        * 280.5 // 111 gCO2 / km en FR
                        / 1000 // conversion g -> kg CO2
                    )
                    resolve(this.postProcessGes(travel, impact))
                }
            })
        })
        return pr
    }
}

Transport.prototype.gesTransit = function (travel, modes) {
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
            transitOptions: { departureTime: depDate, modes: modes, routingPreference: "FEWER_TRANSFERS" },
        }, (res, status) => {
            if (res.routes.length > 0) {
                var impacts = []
                //console.log(res.routes[0].legs[0])
                res.routes[0].legs[0].steps.forEach(step => {
                    if (step.travel_mode === "TRANSIT") {
                        impacts.push(
                            step.distance.value / 1000 // distance in km
                            * this.modes_transit_ges[step.transit.line.vehicle.type] // gCO2 / km
                            / 1000 // g -> kg CO2
                        )
                        //console.log(step.transit.line.vehicle.type, impacts[impacts.length - 1])
                    }
                })
                const impact = impacts.reduce((a, b) => a + b)
                resolve(this.postProcessGes(travel, impact))
            }
        })
    })
    return pr
}

Transport.prototype.getLatLng = function (place) {
    // No spaces for GMaps API
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
                        case "TGV": travels_pr.push(this.gesTransit(this.travels.items[i], ["TRAIN"])); break;
                        case "Métro/Bus": travels_pr.push(this.gesTransit(this.travels.items[i], ["BUS", "RAIL"])); break;
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
