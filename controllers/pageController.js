const axios = require('axios');
const jwt = require('jsonwebtoken');
const nacl = require('tweetnacl');
const { TextEncoder } = require('util');



exports.getHomePage = function (req, res) {
    const token = req.query.token;
    req.session.token = token;
    const hedefURL = 'https://3638-78-177-177-231.ngrok-free.app/user/me';
    axios.get(hedefURL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // res.send(response); // Kullanıcı bilgilerini geri gönder
            // console.log('GET İsteği Başarılı:', response.data);
            const sessionToken = req.session.token;
            res.render('home', {
                title: 'Home',
                token: sessionToken,
                response: response.data
            });
        })
        .catch((error) => {
            res.render('homePage', {
                title: 'HomePage',
                // token: token,
                response: error.data
            });
            // console.error('GET İsteği Hatası:', error);
        });

    // console.log('Token:', token);
}
exports.addTwitterAccount = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    const hedefURL = 'https://3638-78-177-177-231.ngrok-free.app/twitter/authorizeUrl';
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
    const publicKey = req.body.publicKey;


    const hedefURL = 'https://3638-78-177-177-231.ngrok-free.app/metamask/add';
    try {
        const response = await axios.post(hedefURL, { signature, nonce, walletAddress, publicKey }, {  // req.body'yi doğrudan gönderiyoruz
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

function signNonce(nonce, secretKey) {
    const keypair = nacl.sign.keyPair.fromSecretKey(Buffer.from(secretKey));
    const nonceBuffer = new TextEncoder().encode(nonce);
    const signature = nacl.sign.detached(nonceBuffer, keypair.secretKey);
    return {
        signature: Buffer.from(signature).toString('hex'),
        publicKey: Buffer.from(keypair.publicKey).toString('hex')
    };
}

exports.nonceMetaMaskAccount = async function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    console.log(req.body);
    const walletAddress = req.body.walletAddress; // Doğru anahtar
    const nonce = req.body.nonce; // Gelen nonce değerini al

    const keypair = nacl.sign.keyPair();
    const { signature, publicKey } = signNonce(nonce, keypair.secretKey); // Burada nonce'u imzalıyoruz

    return res.json({
        publicKey: publicKey, // Public key'i döndür
        signedMessage: signature, // İmzalı mesajı döndür
        walletAddress: walletAddress // Cüzdan adresini döndür
    });
};