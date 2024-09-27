const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');



const app = express();

app.use(express.static('public'));

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

// const server = http.createServer((req, res) => {
//     // İsteğin URL'sine göre farklı içerikler döndür
//     if (req.url === '/') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         // HTML içeriğini burada döndürüyoruz
//         fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
//             if (err) {
//                 res.statusCode = 500;
//                 res.end('Hata: İçerik yüklenemedi.');
//                 return;
//             }
//             res.end(data);
//         });
//     } else {
//         res.statusCode = 404;
//         res.end('404: Sayı bulunamadı');
//     }
// });

app.listen(PORT,hostname, () => {
    console.log(`Sunucu http://${hostname}:${PORT}/ adresinde çalışıyor`);
});
// server.listen(port, hostname, () => {
//     console.log(`Sunucu http://${hostname}:${port}/ adresinde çalışıyor`);
// });
