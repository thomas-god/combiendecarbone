/**
 * Class that will gather GES results, draw them and manage the saved GES.
 */
class Resultats {
    /**
     * Constructor of the results class that will gather GES results, draw them and manage the saved GES.
     * @param {string} div_id Id of the div to put the Results content into.
     * @param {Transport} transport Transport instance.
     * @param {Logemement} logement Logement instance.
     * @param {Alimentation} alimentation Alimentation instance.
     * @param {Consommation} consommation Consommation instance.
     */
    constructor(div_id, transport, logement, alimentation, consommation) {
        this.div_id = div_id;
        this.transport = transport;
        this.logement = logement;
        this.alimentation = alimentation;
        this.consommation = consommation;
    
        this.ges = {};
    
        this.initDiv()
        this.chart = new Chart(document.getElementById('ges-chart').getContext('2d'), {
            // The type of chart we want to create
            type: 'pie',
        })
        this.chart_zoom = new Chart(document.getElementById('ges-chart-zoom').getContext('2d'), {
            // The type of chart we want to create
            type: 'pie',
        })
    
        this.colors_mode = {
            "Transports": "#5bc0eb",
            "Logement": "#fde74c",
            "Alimentation": "#9bc53d",
            "Consommation": "#e55934"
        }
    }

    /**
     * Populate the div with HTML elements and add buttons callbacks.
     */
    initDiv() {
        const parent_div = document.getElementById(this.div_id)
        parent_div.innerHTML = (
            `<div class="center">
                <h2>Émissions de CO2</h2>
                <div class="resultats-selector">
                    <input type="button" value="Calculer" id="calculer-ges" class="form-button" style="margin: 0px !important;">
                    <p><span> ou </span></p>
                    <label for="select_saved_ges">Charger un bilan</label>
                    <select id="select_saved_ges" class="form-input"></select>
                </div>
                <div class="charts-area disp-none" id="charts-area">
                    <h2 id="total-ges"></h2>
                    <span>
                        <input type="button" value="Sauvegarder bilan" id="save-ges" class="form-button disp-none" style="margin: 0px !important;">
                        <input type="button" value="Supprimer bilan" id="delete-ges" class="form-button disp-none" style="margin: 0px !important;">
                    </span>
                    <div class="chart-ges disp-none" id="div-chart">
                        <canvas id="ges-chart"></canvas>
                    </div>
                    <div class="chart-ges disp-none" id="div-chart-zoom">
                        <canvas id="ges-chart-zoom"></canvas>
                    </div>
                </div>
            </div>`
        )
    
        const buttonComputeGes = document.getElementById('calculer-ges');
        buttonComputeGes.addEventListener('click', () => { this.getGes() });
    
        this.populateSelectSavedGes();
        const selectGes = document.getElementById("select_saved_ges");
        selectGes.onchange = ((event) => this.callbackSelectSavedGes(event));
    
        const buttonSaveGes = document.getElementById("save-ges");
        buttonSaveGes.addEventListener("click", () => this.saveGes());
    
        const buttonDeleteGes = document.getElementById("delete-ges");
        buttonDeleteGes.addEventListener("click", () => this.deleteSavedGes());
    }

    /**
     * Compute total GES by calling computeGES() on each categories objects (transport
     * logement, alimentation, consommation) and then call drawGes method.
     */
    getGes() {
        Promise.all([
            this.transport.computeGES(),
            this.logement.computeGES(),
            this.alimentation.computeGES(),
            this.consommation.computeGES()
        ])
        .then((values) => {
            values.forEach(val => {
                console.log(val)
                this.ges[val.name] = val.values
            })
            this.drawGes();
            this.toggleAddDelButtons("save");
            const div_chart = document.getElementById('div-chart-zoom')
            div_chart.classList.add('disp-none')
        })
    
    }

    /**
     * Toggle display state between save and delete GES buttons.
     * @param {string} button "save" or "delete" to to choose the button to be displayed, the other being hidden.
     */
    toggleAddDelButtons(button) {
        const buttonSave = document.getElementById("save-ges");
        const buttonDelete = document.getElementById("delete-ges");
        if (button === "save") {
            buttonSave.classList.remove("disp-none");
            buttonDelete.classList.add("disp-none");
        } else if (button === "delete") {
            buttonSave.classList.add("disp-none");
            buttonDelete.classList.remove("disp-none");
        }
    }

    /**
     * Update the options of the select object with the GES found in the localStorage.
     */
    populateSelectSavedGes() {
        // Clear select of all its children
        const select = document.getElementById("select_saved_ges")
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
        // Load saved ges
        const saved_ges = this.loadSavedGes();
    
        // First value, placeholder
        let option = document.createElement("option");
        option.innerText = "-- Bilans sauvegardés --";
        option.value = -1;
        select.appendChild(option);
    
        // Populate select
        for (const [i, ges] of saved_ges.entries()) {
            let name = `${ges.date} - ${ges.ges_tot} kg eq.CO2`;
            let option = document.createElement("option");
            option.innerText = name;
            option.value = i;
            select.appendChild(option);
        }
    }

    /**
     * Callback when an option is selected in the saved GES select. Call drawGes method with the new GES values.
     * @param {event} event event passed by the eventListener.
     */
    callbackSelectSavedGes(event) {
        const saved_ges = this.loadSavedGes();
        const id = event.target.value;
        if (id >= 0) {
            this.ges = saved_ges[id].ges;
            this.drawGes();
            this.toggleAddDelButtons("delete");
        }
    }

    /**
     * Load the GES data saved in the localStorage and parse them.
     */
    loadSavedGes() {
        return localStorage.getItem("ges") ? JSON.parse(localStorage.getItem("ges")) : [];
    }

    /**
     * Save the current GES data in the localStorage if the total amount of GES is >0.
     */
    saveGes() {
        // Format new ges
        const ges_total = this.getTotalGes();
        const date = new Date();
    
        // Push and write to local storage only if ges_tot > 0
        if (ges_total > 0) {
            let saved_ges = this.loadSavedGes();
            saved_ges.push({
                date: date.toLocaleDateString(),
                ges_tot: ges_total,
                ges: this.ges
            });
            localStorage.setItem("ges", JSON.stringify(saved_ges));
            this.toggleAddDelButtons("delete");
        }
    
        // Update content of select for saved ges
        this.populateSelectSavedGes();
    }

    /**
     * Delete an item from the GES saved in the localStorage.
     */
    deleteSavedGes () {
        const id = document.getElementById("select_saved_ges").value;
        let saved_ges = this.loadSavedGes();
        if (id >= 0 && id < saved_ges.length) {
            saved_ges.splice(id, 1);
        }
        localStorage.setItem("ges", JSON.stringify(saved_ges));
        this.populateSelectSavedGes()
        const div_charts = document.getElementById("charts-area");
        div_charts.classList.add("disp-none")
    }

    /**
     * Compute the total number of GES by reducing across all categories.
     */
    getTotalGes() {
        var ges_by_mode = {}
        for (const mode in this.ges) {
            ges_by_mode[mode] = this.reduceByMode(this.ges[mode])
        }
        return Math.round(Object.values(ges_by_mode).reduce((a, b) => a+b))
    }

    /**
     * Get the sum of GES for a given category.
     * @param {Object | number} mode Category to get the total GES from
     */
    reduceByMode(mode) {
        if (typeof mode === "number") {
            return mode
        } else if (typeof mode === "object") {
            return Object.values(mode).reduce((a, b) => a + b)
        } else {
            return 0
        }
    }

    /**
     * Draw the main chart.
     */
    drawGes() {
        var ges_by_mode = {};
        for (const mode in this.ges) {
            ges_by_mode[mode] = this.reduceByMode(this.ges[mode]);
        }
        const ges_total = this.getTotalGes();
        const totalGES = document.getElementById("total-ges");
        totalGES.innerHTML = `Vos émissions annuelles sont de ${ges_total} kg de CO2.`;
    
        var colors = [];
        Object.keys(ges_by_mode).forEach(mode => {
            colors.push(this.colors_mode[mode]);
        })
    
        this.chart.clear();
        this.chart_zoom.clear();
        this.chart.data.labels = Object.keys(ges_by_mode);
        this.chart.options = {
            responsive: true,
            maintainAspectRatio: false
        }
        this.chart.data.datasets = [{
            label: 'GES emissions',
            title: "Émissions par secteur",
            data: Object.values(ges_by_mode),
            backgroundColor: colors
        }]
        this.chart.options =  {
            events: ['click'],
            onClick: (e) => this.drawGesZoom(e)
        }
        this.chart.update()
        const div_chart = document.getElementById('div-chart')
        div_chart.classList.remove('disp-none')
        const div_charts = document.getElementById("charts-area");
        div_charts.classList.remove("disp-none")
    }

    /**
     * Draw on the secondary chart.
     * @param {event} e Event passed by ChartJS when clicking.
     */
    drawGesZoom(e) {
        let activePoints = this.chart.getElementsAtEvent(e);
        if (activePoints.length > 0) {
            let selectedIndex = activePoints[0]._index;
            let selectedColor = activePoints[0]._view.backgroundColor;
            console.log(activePoints[0])
            let posteSelected = this.chart.data.labels[selectedIndex]
            let secondDataset = this.ges[posteSelected]

            let secondColors = this.getSecondaryColors(selectedColor, Object.keys(secondDataset).length)
            console.log(secondColors)
            this.chart_zoom.clear();
            this.chart_zoom.data.labels = Object.keys(secondDataset)
            this.chart_zoom.data.datasets = [{
                label: posteSelected,
                data: Object.values(secondDataset),
                backgroundColor: secondColors
            }]
            this.chart_zoom.update()
            let div_chart = document.getElementById('div-chart-zoom')
            div_chart.classList.remove('disp-none')
        }
    }

    /**
     * Generate colors from a master color by shading and lighting it.
     * @param {string} masterColor Master color (rgb or hex representation) to get secondary colors from.
     * @param {number} nbColors Number of colors to generate (including the master color).
     */
    getSecondaryColors(masterColor, nbColors) {
        var secondColors = []
        for(let i = 0; i < nbColors; i++) {
            secondColors.push(this.pSBC(- 0.25 * i, masterColor))
        }
        return secondColors
    }

    /**
     * https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#stackoverflow-archive-begin
     * @param {*} p 
     * @param {*} c0 
     * @param {*} c1 
     * @param {*} l 
     */
    pSBC(p,c0,c1,l) {
        let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
        if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
        if(!this.pSBCr)this.pSBCr=(d)=>{
            let n=d.length,x={};
            if(n>9){
                [r,g,b,a]=d=d.split(","),n=d.length;
                if(n<3||n>4)return null;
                x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
            }else{
                if(n==8||n==6||n<4)return null;
                if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
                d=i(d.slice(1),16);
                if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
                else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
            }return x};
        h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
        if(!f||!t)return null;
        if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
        else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
        a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
        if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
        else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
    }
}