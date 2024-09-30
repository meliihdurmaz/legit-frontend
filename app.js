const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const fetch = require('node-fetch');






const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // 'public/index.html' dosyasını gönder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/twitter/authorizeUrl', async (req, res) => {
//     const authUrl = `http://127.0.0.1:8000/twitter/authorizeUrl`;
    
//     try {
//         const token = req.headers.authorization.split(' ')[1]; // Bearer token'ı alın
//         const response = await fetch(authUrl, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             res.json(data); // Yetkilendirme URL'sini frontend'e gönderiyoruz
//         } else {
//             res.status(500).json({ error: 'Twitter connection failed: ' + response.statusText });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred: ' + error.message });
//     }
// });

// Sunucuyu dinle
app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
