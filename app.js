const express = require('express');
const app = express();
const cors = require('cors');

// const port = 3000;

// Gerekli middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: '*' }));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get('/user', (req, res) => {
    // const { userId } = req.params;
    const token = req.query.token; // Token'ı al

    // Token doğrulama ve kullanıcı bilgilerini işle
    if (token) {
        // Kullanıcı bilgilerini al ve göster
        res.send(`<h1>Hoş Geldiniz, Kullanıcı ID:}</h1><p>Token: ${token}</p>`);
    } else {
        res.status(403).send('Geçersiz token');
    }
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
