const path = require('path');
const express = require('express');



const app = express();

app.use(express.static('public'));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // 'public/index.html' dosyasını gönder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
// server.listen(port, hostname, () => {
//     console.log(`Sunucu http://${hostname}:${port}/ adresinde çalışıyor`);
// });
