var header_active = "header-accueil";
const header_buttons = [
    "header-accueil",
    "header-transport",
    "header-logement",
    "header-alimentation",
    "header-consommation",
    "header-resultats",
]

/**
 * Callback function for the toggling item on the header navbar.
 */
function toggleHeader() {
    let target_id = event.target.id;
    if (target_id === "header-previous") {
        let active_id = header_buttons.indexOf(header_active);
        if (active_id > 0) {
            header_active = header_buttons[active_id - 1];
        }
    } else if (target_id === "header-next") {
        let active_id = header_buttons.indexOf(header_active);
        if (active_id < header_buttons.length - 1) {
            header_active = header_buttons[active_id + 1];
        }

    } else if (header_buttons.includes(target_id)) {
        header_active = event.target.id;
    } else {
        console.log("Wrong caller");
    }
    renderHeader();
    updateArticles();
}

/**
 * Render the navbar depending on which element is selected
 * (via variable header_active).
 */
function renderHeader() {
    // Previous button
    let button_previous = document.getElementById("header-previous");
    if (header_active !== header_buttons[0]) {
        button_previous.classList.remove("hidden");
    } else {
        button_previous.classList.add("hidden");
    }

    // Next button
    let button_next = document.getElementById("header-next");
    if (header_active !== header_buttons[header_buttons.length - 1]) {
        button_next.classList.remove("hidden");
    } else {
        button_next.classList.add("hidden");
    }

    // Other buttons
    header_buttons.forEach(header => {
        let button = document.getElementById(header);
        if (header === header_active) {
            button.classList.add("header-active");
        } else {
            button.classList.remove("header-active");
        }
    })
}

/**
 * Hide and show the article corresponding to header_active
 */
function updateArticles() {
    header_buttons.forEach((header) => {
        mode = header.split("-")[1]
        let form_mode = document.getElementById("form-" + mode)
        let methodo_mode = document.getElementById("methodologie-" + mode)
        if(header === header_active) {
            form_mode.classList.remove("disp-none")
            methodo_mode.classList.remove("disp-none")
        } else {
            form_mode.classList.add("disp-none")
            methodo_mode.classList.add("disp-none")
        }
    })
}