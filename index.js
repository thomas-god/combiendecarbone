const express = require("express");
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

// Write stream for logs
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express();
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello world !");
})

app.listen(8080, console.log("Server listening on port 8080..."));
