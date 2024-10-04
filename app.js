const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();


app.use(express.json());



app.use(express.static('public'));


app.use(cors({
    origin: 'https://t.me/legit_v1_bot', // Telegram'ın kendi originini belirtin
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.get('/', (req, res) => {
    const token = req.params.token; // Token'ı alın
    const hedefURL = 'https://7536-78-177-177-231.ngrok-free.app/user/me';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Başarılı:', response.data);
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });

    res.sendFile(__dirname + '/public/index.html'); // HTML dosyasını gönder
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
