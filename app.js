const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();


const PageRouter = require("./router/pageRouter.js");

app.set("view engine", "ejs");


app.use(express.json());



// app.use(express.static('public'));


app.use(cors());

// app.get('/', (req, res) => {
//     const token = req.query.token; // Token'ı query parametresi olarak alın
//     const hedefURL = 'https://7536-78-177-177-231.ngrok-free.app/user/me';
//     axios.get(hedefURL, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((response) => {
//             res.send(response); // Kullanıcı bilgilerini geri gönder
//             console.log('GET İsteği Başarılı:', response.data);
//         })
//         .catch((error) => {
//             console.error('GET İsteği Hatası:', error);
//         });

//     // res.sendFile(__dirname + '/public/index.html'); // HTML dosyasını gönder
// });




app.use("/", PageRouter);

app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
