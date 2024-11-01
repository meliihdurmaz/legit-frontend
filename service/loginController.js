const axios = require('axios');


exports.twitterLogin = function (req, res) {
    // console.log('Twitter Login');
    const hedefURL = 'https://f642rqhc-8000.euw.devtunnels.ms/twitter/login';
    axios.get(hedefURL, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Bılı:', response.data);
            const redirectUrl = response.data[0];
            console.log('Redirect URL:', redirectUrl);
            res.json({ redirectUrl });
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });

    // console.log('Token:', token);
};

exports.telegramLogin = function (req, res) {
    // const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'https://f642rqhc-8000.euw.devtunnels.ms/telegram/login';
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
    // console.log(req)
    res.render('telegramCallback', {
        title: 'callback',
    });
};


exports.connectTelegram = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'https://f642rqhc-8000.euw.devtunnels.ms/telegram/telegramAddUrl';
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

