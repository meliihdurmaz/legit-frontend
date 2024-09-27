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
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Send the data as JSON
    })
        .then(response => response.json())
        .then(responseData => {
            const bearerToken = responseData;


            // Inline button creation
            const keyboard = {
                inline_keyboard: [
                    [{ text: "Doğrulama yap", callback_data: 'verify' }]
                ]
            };
            bot.sendMessage(
                chatId,
                'Merhaba! Aşağıdaki butona tıklayarak doğrulama yapabilirsiniz',
                { reply_markup: keyboard }
            );

            console.log('Success:', responseData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Send message to the user

});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const bearerToken = query.message.text; // Tokeni buradan alabilirsiniz veya veritabanında saklayabilirsiniz
    const url = 'https://t.me/legit_verified_bot/legit_bot'; // Hedef URL

    const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    };

    // API isteği
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
    });
    
    const responseData = await response.json();

    bot.sendMessage(chatId, `Doğrulama Sonucu: ${JSON.stringify(responseData)}`);
});

// Sunucuyu dinle
app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
