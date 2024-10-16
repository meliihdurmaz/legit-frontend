const axios = require('axios');


exports.telegramLogin = function (req, res) {
    const token = req.query.token;
    req.session.token = token;
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
}

exports.telegramCallback = function (req, res) {
    res.render('telegramCallback', {
        title: 'callback',
    });
}