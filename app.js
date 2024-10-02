const express = require('express');
const app = express();
const cors = require('cors');

// const port = 3000;

// G0erekli middleware
// app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: '*' }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     if (req.method === 'OPTIONS') {
//       return res.sendStatus(200);
//     }
//     next();
//   });
  

app.use(express.static('public')); 

app.get('/', (req, res) => {
    // token=req.params.token;
    res.sendFile(__dirname + '/public/index.html');
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
