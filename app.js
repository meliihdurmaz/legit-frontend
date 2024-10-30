const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PageRouter = require("./controller/pageRouter.js");
const homePageRouter = require("./controller/homePageRouter.js");
const loginRouter = require("./controller/loginRouter.js");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
 
app.use(cors());
 

app.use("/", PageRouter);
app.use("/login", loginRouter);
app.use("/home", homePageRouter);


app.listen(PORT, () => {
    console.log("deneme");
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
