const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');


// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const serviceUrl = process.env.SERVICE_URL || 'https://8593-78-177-177-231.ngrok-free.app/';



const token = '7642700137:AAGL1ptojbliCSLRgzIf0dlLBNd6LCtV368';

// Telegram botunu başlat
const bot = new TelegramBot(token, { polling: true });

const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // 'public/index.html' dosyasını gönder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// '/start' komutu alındığında
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString(); // Kullanıcının Telegram ID'si
    const data = { email: telegramId, password: "legitbot" };
    const apiUrl = 'https://8593-78-177-177-231.ngrok-free.app/auth/login';
    // Sunucuya istek yap
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(json => {
            // Eğer kullanıcı doğrulandıysa
            if (json) {
                // Kullanıcıya mesaj gönder
                const bearerToken = json;
                const url = `https://t.me/legit_v1_bot/legit?token= ${bearerToken}`;
                bot.sendMessage(chatId, 'Doğrulama başarılı!');
            } else {
                // Kullanıcıya mesaj gönder
                bot.sendMessage(chatId, 'Doğrulama başarısız!');
            }
        })
        .catch(err => console.log(err));


    // Inline button creation
    const keyboard = {
        inline_keyboard: [
            [{ text: "Doğrulama yap", url: url }]
        ]
    };
    // Send message to the user
    bot.sendMessage(
        chatId,
        'Merhaba! Aşağıdaki butona tıklayarak doğrulama yapabilirsiniz',
        { reply_markup: keyboard }
    );
});

// Sunucuyu dinle
app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
