const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');


const PORT = process.env.PORT || 3000;

const app = express();


const PageRouter = require("./router/pageRouter.js");
const homePageRouter = require("./router/homePageRouter.js");

app.set("view engine", "ejs");


app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: '1234',  // Güçlü bir secret belirleyin
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }   // Geliştirme ortamında `secure` false olmalı, production'da true yapabilirsiniz.
}));



// app.use(express.static('public'));


app.use(cors());


app.use("/", PageRouter);
app.use("/login", homePageRouter);
app.use("/home", homePageRouter);


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
