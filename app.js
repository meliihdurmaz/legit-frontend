const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // İsteğin URL'sine göre farklı içerikler döndür
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // HTML içeriğini burada döndürüyoruz
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Hata: İçerik yüklenemedi.');
                return;
            }
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('404: Sayı bulunamadı');
    }
});

server.listen(port, hostname, () => {
    console.log(`Sunucu http://${hostname}:${port}/ adresinde çalışıyor`);
});
