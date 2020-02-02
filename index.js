const express = require("express");
const https = require('https');
const fs = require('fs');
const clog = require('./custom-logger');

// Prod (https) or dev (http)
const httpsOptions = (process.env.GES_MODE === 'production') ?{
  key: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/combiendecarbone.fr/fullchain.pem', 'utf8')
}: {};

// Core app
const app = express();
var cnt = 0;
app.use((req, res, next) => {
  if (req.url === '/') {
    clog.log(`${new Date().toISOString()} ${req.ip.split(":")[3]} ${req.hostname} ${cnt} \n`);
  }
  next();
})
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(req);
  res.send("Hello world !");
})

// Prod (https) or dev (http)
if (process.env.GES_MODE === 'production') {
  let port = 443;
  const httpsServer = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server listenning in production mode on port ${port}...`);
  })
  
} else if (process.env.GES_MODE === 'dev') {
  let port = 3000;
  app.listen(port, () => {
    console.log(`Server listenning in dev mode on port ${port}...`);
  })
}