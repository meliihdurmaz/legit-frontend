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
    const queryParams = req.query; 
    const token = queryParams.token; 

    if (token) {
        res.send(`Token alındı: ${req}`);
    } else {
        res.send(`Token alınmadı: ${req}`);
    }
});


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
