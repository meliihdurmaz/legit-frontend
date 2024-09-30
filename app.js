const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');


// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const serviceUrl = process.env.SERVICE_URL || 'https://802f-78-177-177-231.ngrok-free.app/';



// const token = '7642700137:AAGL1ptojbliCSLRgzIf0dlLBNd6LCtV368';

// Telegram botunu başlat
// const bot = new TelegramBot(token, { polling: true });

const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // 'public/index.html' dosyasını gönder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu dinle
app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
