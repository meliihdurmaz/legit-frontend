const express = require('express');
const app = express();
const cors = require('cors');

// const port = 3000;

// G0erekli middleware
// app.use(express.static('public'));

app.use(cors({
    origin: '*',  // Tüm originlere izin veriyor (güvenlik gereği sadece belirli origin'lere izin vermek daha iyi olur)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // İzin verilen HTTP metodları
    allowedHeaders: ['Content-Type', 'Authorization'],  // İzin verilen başlıklar
}));

app.use(express.json());

// app.get('/user/me', (req, res) => {
//     const token = req.headers.authorization;  // Bearer token alınması
//     if (!token) {
//         return res.status(401).json({ error: "Token eksik" });
//     }

//     // Token doğrulama işlemi ve kullanıcı bilgisi döndürme
//     res.json({
//         username: "legit_user",
//         tasks: [
//             { name: "Görev 1", completed: false },
//             { name: "Görev 2", completed: true }
//         ]
//     });
// });

app.use(express.static('public')); 

app.get('/', (req, res) => {
    // token=req.params.token;
    res.sendFile(__dirname + '/public/index.html');
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
