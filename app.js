const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Cookie parser kullanımı

const app = express();

app.use(cors({ origin: '*' }));
// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const queryParams = req.query; // URL'deki query parametreleri
    const token = queryParams.token; // Örneğin ?token=123 şeklinde bir parametre geldiğinde alır

    if (token) {
        // Eğer token varsa bunu kullanarak işlem yapabilirsiniz
        res.send(`Token alındı: ${token}`);
    } else {
        // Token yoksa bir mesaj dönebilirsiniz
        res.send('Token yok. Ana sayfa açıldı.');
    }
});


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
