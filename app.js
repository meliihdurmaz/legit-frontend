const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');


const token = '7642700137:AAGL1ptojbliCSLRgzIf0dlLBNd6LCtV368';

// Telegram botunu başlat
const bot = new TelegramBot(token, { polling: true });

const app = express();
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
    const telegramId = msg.from.id; // Kullanıcının Telegram ID'si
    const userName = msg.from.username; // Kullanıcının Telegram kullanıcı adı

    // Uncomment and modify if you want to send user data to your server
    // const data = {
    //     telegramId: telegramId,
    //     userName: userName
    // };

    // fetch('http://your-api-url.com/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data) // Convert data to JSON string
    // })
    // .then(response => response.json()) // Parse JSON response
    // .then(data => {
    //     console.log(data);
    //     bot.sendMessage(chatId, 'Veri başarıyla gönderildi.');
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     bot.sendMessage(chatId, 'Veri gönderiminde bir hata oluştu.');
    // });

    // Verification URL with user data
    const url = `https://t.me/legit_v1_bot/legit?telegramId=${telegramId}&username=${userName}`;
    
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
