const express = require("express");
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello world !");
})

app.listen(80, () => {
    console.log("Server listenin on port 1234");
})
