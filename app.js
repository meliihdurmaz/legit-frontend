const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// Bot tokeninizi buraya ekleyin
const token = '7642700137:AAGL1ptojbliCSLRgzIf0dlLBNd6LCtV368';

// Telegram botunu başlat
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.static('public'));

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

    // Doğrulama URL'si
    const url = `https://t.me/legit_v1_bot/legit?telegramId=${telegramId}&username=${userName}`;
    
    // Inline buton oluşturma
    const keyboard = {
        inline_keyboard: [
            [{ text: "Doğrulama yap", url: url }] // Buton URL'sini burada ayarlayın
        ]
    };

    // Kullanıcıya mesaj gönder
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
