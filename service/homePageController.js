const axios = require('axios');


exports.telegramLogin = function (req, res) {
    // const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'https://6d51-78-177-177-231.ngrok-free.app/telegram/login';
    axios.get(hedefURL, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Başarılı:', response.data);
            const redirectUrl = response.data.url;
            res.json({ redirectUrl });
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });

    // console.log('Token:', token);
};

exports.telegramCallback = function (req, res) {
    const tgAuthResult = req.hash || req.query.tgAuthResult; // tgAuthResult URL'den alınır

    if (tgAuthResult) {
        try {
            // JWT ile veriyi parse etme
            const decoded = jwt.decode(tgAuthResult);
            console.log('Decoded Data:', decoded);

            // İşlem sonrası uygun yanıt gönderilebilir
            res.send('Veri alındı');
        } catch (error) {
            console.error('Veri işlenirken hata:', error);
            res.status(400).send('Bad Request');
        }
    } else {
        console.error('tgAuthResult parametresi bulunamadı');
        res.status(400).send('Bad Request');
    }
};

exports.connectTelegram = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'https://6d51-78-177-177-231.ngrok-free.app/telegram/telegramAddUrl';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Başarılı:', response.data);
            res.json({ response: response.data });
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });
};