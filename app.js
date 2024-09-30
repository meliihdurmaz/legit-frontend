const express = require('express');
const app = express();
const cors = require('cors');

// const port = 3000;

// Gerekli middleware
// app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    console.log(req.query);

    res.send('Hello World!');
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
