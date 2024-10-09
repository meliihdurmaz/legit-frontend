const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();


const PageRouter = require("./router/pageRouter.js");

app.set("view engine", "ejs");


app.use(express.json());
app.use(bodyParser.json());



// app.use(express.static('public'));


app.use(cors());


app.use("/", PageRouter);

app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
