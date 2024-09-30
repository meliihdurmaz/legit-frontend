const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser'); // Cookie parser kullanımı






const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
function parseJwt(token) {
    if (!token) {
        throw new Error("Geçersiz token: Token boş veya null.");
    }

    const base64Url = token.split('.')[1];

    if (!base64Url) {
        throw new Error("Geçersiz token: Payload bulunamadı.");
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

app.get('/', (req, res) => {
    const token = req.query.token;
    if (token) {
        try {
            const decodedToken = parseJwt(token); // Token'ı çöz
            res.cookie('bearerToken', decodedToken, { httpOnly: true }); // httpOnly güvenli çerez
            res.sendFile(path.join(__dirname, 'public', 'index.html')); // HTML dosyasını gönder
        } catch (error) {
            console.error(error.message);
            return res.status(400).send('Token çözümleme hatası: ' + error.message);
        }
    } else {
        return res.status(401).send('Token gerekli.'); // Hata yanıtı
    }

});
// Sunucuyu dinle
app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
