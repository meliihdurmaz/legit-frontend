const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7642700137:AAGL1ptojbliCSLRgzIf0dlLBNd6LCtV368';

const bot = new TelegramBot(token, { polling: true });


const app = express();

app.use(express.static('public'));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // 'public/index.html' dosyasını gönder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id; // Kullanıcının Telegram ID'si
    const userName = msg.from.username; // Kullanıcının Telegram kullanıcı adı
    url = "https://t.me/legit_verified_bot/legit_bot"
    keyboard = [[InlineKeyboardButton("Doğrulama yap", url=url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    // Kullanıcıya bir mesaj gönder
    bot.sendMessage(chatId, `Merhaba ${userName}, Telegram ID'niz: ${telegramId}`);
});

app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
// server.listen(port, hostname, () => {
//     console.log(`Sunucu http://${hostname}:${port}/ adresinde çalışıyor`);
// });
