function Resultats(div_id, transport, logement, alimentation, consommation) {
    this.div_id = div_id;
    this.transport = transport;
    this.logement = logement;
    this.alimentation = alimentation;
    this.consommation = consommation;

    this.ges = {}

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

Resultats.prototype.initDiv = function () {
    const parent_div = document.getElementById(this.div_id)
    parent_div.innerHTML = (
        `<div class="transport-container-form center">
            <h2>Émissions de CO2</h2>
            <input type="button" value="Calculer" id="calculer-ges" class="form-button" style="margin: 0px !important;">
            <h2 id="total-ges"></h2>
            <div class="chart-ges disp-none" id="div-chart">
                <canvas id="ges-chart"></canvas>
            </div>
            <div class="chart-ges disp-none" id="div-chart-zoom">
                <canvas id="ges-chart-zoom"></canvas>
            </div>
        </div>`
    )

    const buttonComputeGes = document.getElementById('calculer-ges')
    buttonComputeGes.addEventListener('click', () => { this.getGes() })
}

Resultats.prototype.getGes = function() {
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
        var div_chart = document.getElementById('div-chart-zoom')
        div_chart.classList.add('disp-none')
    })

}

Resultats.prototype.reduceByMode = function(mode) {
    if (typeof mode === "number") {
        return mode
    } else if (typeof mode === "object") {
        return Object.values(mode).reduce((a, b) => a + b)
    } else {
        return 0
    }
}

Resultats.prototype.drawGes = function() {
    var ges_by_mode = {}
    for (const mode in this.ges) {
        ges_by_mode[mode] = this.reduceByMode(this.ges[mode])
    }
    const ges_total = Math.round(Object.values(ges_by_mode).reduce((a, b) => a+b))
    const totalGES = document.getElementById("total-ges")
    totalGES.innerHTML = `Vos émissions annuelles sont de ${ges_total} kg de CO2.`

    var colors = []
    Object.keys(ges_by_mode).forEach(mode => {
        colors.push(this.colors_mode[mode])
    })

    this.chart.clear();
    this.chart.data.labels = Object.keys(ges_by_mode)
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
        onClick: (e) => {
            var activePoints = this.chart.getElementsAtEvent(e);
            if (activePoints.length > 0) {
                var selectedIndex = activePoints[0]._index;
                var selectedColor = activePoints[0]._view.backgroundColor;
                console.log(activePoints[0])
                var posteSelected = this.chart.data.labels[selectedIndex]
                var secondDataset = this.ges[posteSelected]

                var secondColors = this.getSecondaryColors(selectedColor, Object.keys(secondDataset).length)
                console.log(secondColors)
                this.chart_zoom.clear();
                this.chart_zoom.data.labels = Object.keys(secondDataset)
                this.chart_zoom.data.datasets = [{
                    label: posteSelected,
                    data: Object.values(secondDataset),
                    backgroundColor: secondColors
                }]
                this.chart_zoom.update()
                var div_chart = document.getElementById('div-chart-zoom')
                div_chart.classList.remove('disp-none')
            }
        }
    }
    this.chart.update()
    const div_chart = document.getElementById('div-chart')
    div_chart.classList.remove('disp-none')
}

Resultats.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Resultats.prototype.getSecondaryColors = function(masterColor, nbColors) {
    var secondColors = []
/*     var n_inf = -Math.floor(nbColors/2)
    var n_sup = Math.floor(nbColors/2) + (nbColors % 2 == 0 ? 1: 0)
    console.log(nbColors, n_inf, n_sup)
    for(let i = -n_inf; i <= n_sup; i++) {
        secondColors.push(this.pSBC(i * 0.1, masterColor))
    } */
    for(let i = 0; i < nbColors; i++) {
        secondColors.push(this.pSBC(- 0.25 * i, masterColor))
    }
    return secondColors
}

Resultats.prototype.pSBC = function(p,c0,c1,l) {
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
