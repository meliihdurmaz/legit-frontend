const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Cookie parser kullanımı






const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
