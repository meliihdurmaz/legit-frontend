const axios = require('axios');
const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');
const { ethers } = require('ethers');



exports.getHomePage = function (req, res) {
    const token = req.query.token;

    const hedefURL = 'https://cd10-159-146-81-160.ngrok-free.app/user/me';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // res.send(response); // Kullanıcı bilgilerini geri gönder
            // console.log('GET İsteği Başarılı:', response.data);
            res.render('home', {
                title: 'Home',
                token: token,
                response: response.data
            });
        })
        .catch((error) => {
            res.render('homePage', {
                title: 'HomePage',
                // token: token,
                response: response.data
            });
            console.error('GET İsteği Hatası:', error);
        });

    // console.log('Token:', token);
}

exports.addTwitterAccount = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'ttps://92ad-159-146-81-160.ngrok-free.app/twitter/authorizeUrl';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // console.log('GET İsteği Başarılı:', response.data);
            const redirectUrl = response.data;
            res.json({ redirectUrl });
            // res.redirect(redirectUrl);
        })
        .catch((error) => {
            console.error('GET İsteği Hatası:', error);
        });
};
exports.addMetaMaskAccount = async function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const signature = req.body.signature;
    const nonce = req.body.nonce;
    const walletAddress = req.body.walletAddress;
    
    
    const hedefURL = 'https://cd10-159-146-81-160.ngrok-free.app/metamask/add';
    try {
        const response = await axios.post(hedefURL, {signature,nonce,walletAddress}, {  // req.body'yi doğrudan gönderiyoruz
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('POST İsteği Başarılı:', response.data);
    } catch (error) {
        console.error('POST İsteği Hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu.' });  // Hata durumunda istemciye hata mesajı gönder
    }
};