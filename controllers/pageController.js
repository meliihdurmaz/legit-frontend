const axios = require('axios');

exports.getHomePage = function (req, res) {
    const token = req.query.token;

    const hedefURL = 'https://7536-78-177-177-231.ngrok-free.app/user/me';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // res.send(response); // Kullanıcı bilgilerini geri gönder
            console.log('GET İsteği Başarılı:', response.data);
            res.render('home', {
                title: 'Home',
                response: response.data
            });
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });

    console.log('Token:', token);

}
