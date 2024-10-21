const axios = require('axios');





exports.getHomePage = function (req, res) {
    res.render('home', {
        title: 'Home',
    });
};
exports.getAccounts = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    console.log('Token:', token);
    const hedefURL = 'https://8f08-78-177-177-231.ngrok-free.app/user/getAccounts';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Başarılı:', response.data);
            res.json(response.data);  // Başarılı durumda istemciye veriyi gönder
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
            res.status(500).json({ message: 'Bir hata oluştu.' });  // Hata durumunda istemciye hata mesajı gönder
        });
    // const hedefURL = 'https://8f08-78-177-177-231.ngrok-free.app/user/me';
    // axios.get(hedefURL, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then((response) => {
    //         // res.send(response); // Kullanıcı bilgilerini geri gönder
    //         // console.log('GET İsteği Başarılı:', response.data);
    //         const sessionToken = req.session.token;
    //         res.render('home', {
    //             title: 'Home',
    //             token: sessionToken,
    //             response: response.data
    //         });
    //     })
    //     .catch((error) => {
    //         res.render('homePage', {
    //             title: 'HomePage',
    //             // token: token,
    //             response: error.data
    //         });
    //         // console.error('GET İsteği Hatası:', error);
    //     });
};
exports.addTelegramAccount = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const hedefURL = 'https://8f08-78-177-177-231.ngrok-free.app/telegram/add';
    axios.post(hedefURL, req.body, {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
};
exports.getTelegramInvites = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    axios.get('https://8f08-78-177-177-231.ngrok-free.app/user/getTelegramInvites', {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('GET İsteği Başarılı:', response.data);
            res.json(response.data);  // Başarılı durumda istemciye veriyi gönder
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
            res.status(500).json({ message: 'Bir hata oluştu.' });  // Hata durumunda istemciye hata mesajı gönder
        });

};

exports.acceptInvite = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const username = req.body;
    console.log('Username:', username);
    const hedefURL = 'https://8f08-78-177-177-231.ngrok-free.app/user/respondTelegramInvite';
    axios.post(hedefURL, {
        username: String(username.username),
        status: "accept"
    }, {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Başarıyla gönderildi:', response.data);
        })
        .catch(error => {
            console.error('Hata oluştu:', error.response ? error.response.data : error.message);
        });


};

