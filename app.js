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
    const token = req.query.token;
    res.sendFile(path.join(__dirname, 'public', 'homePage.html'));

    // if (token) {
    //     res.send(`Token alındı: ${req.query.token}`);
    // } else {
    //     res.send(`Token alınmadı: ${req.query.token}`);
    // }
});


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
