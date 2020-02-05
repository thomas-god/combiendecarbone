const express = require("express");
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/fullchain.pem', 'utf8')
};

// Write stream for logs
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express();
app.use(express.static('public'));
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.send("Hello world !");
})

const httpsServer = https.createServer(options, app).listen(443)
