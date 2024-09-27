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

    // Doğrulama URL'si
    const url = `https://telagramapplegit-a55c4719cc06.herokuapp.com/?telegramId=${telegramId}&username=${userName}`;
    
    // Inline buton oluşturma
    const keyboard = [
        [InlineKeyboardButton("Doğrulama yap", url)] // Buton URL'sini burada ayarlayın
    ];
    const reply_markup = InlineKeyboardMarkup(keyboard);

    // Kullanıcıya mesaj gönder
    bot.sendMessage(
        chatId,
        'Merhaba! Aşağıdaki butona tıklayarak doğrulama yapabilirsiniz',
        { reply_markup }
    );
});

app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
// server.listen(port, hostname, () => {
//     console.log(`Sunucu http://${hostname}:${port}/ adresinde çalışıyor`);
// });
