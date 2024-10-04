const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

// const port = 3000;

// G0erekli middleware
// app.use(express.static('public'));

app.use(cors({
    origin: '*',  // Tüm originlere izin veriyor (güvenlik gereği sadece belirli origin'lere izin vermek daha iyi olur)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // İzin verilen HTTP metodları
    allowedHeaders: ['Content-Type', 'Authorization'],  // İzin verilen başlıklar
}));

app.use(express.json());



app.use(express.static('public'));

app.get('/', (req, res) => {
    token=req.params.token;
    const hedefURL = 'https://7536-78-177-177-231.ngrok-free.app/user/me';
    axios.get(hedefURL,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('POST İsteği Başarılı:', response);
        })
        .catch((error) => {
            console.error('POST İsteği Hatası:', error);
        });

    res.sendFile(__dirname + '/public/index.html');
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
