const express = require("express");
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/fullchain.pem', 'utf8')
};

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello world !");
})

const httpsServer = https.createServer(options, app).listen(443)
