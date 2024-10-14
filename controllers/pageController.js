const axios = require('axios');
const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');



exports.getHomePage = function (req, res) {
    const token = req.query.token;
    req.session.token = token;
    const hedefURL = 'https://ae87-78-177-177-231.ngrok-free.app/user/me';
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
    const hedefURL = 'https://ae87-78-177-177-231.ngrok-free.app/twitter/authorizeUrl';
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
    const nonce = req.body.nonce;
    const walletAddress = req.body.walletAddress;
    const publicKey = req.body.publicKey;


    const hedefURL = 'https://ae87-78-177-177-231.ngrok-free.app/metamask/add';
    try {
        const response = await axios.post(hedefURL, { nonce, walletAddress, publicKey }, {  // req.body'yi doğrudan gönderiyoruz
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('POST İsteği Başarılı:', response.data);
        res.json(response.data);  // Başarılı durumda istemciye veriyi gönder
    } catch (error) {
        console.error('POST İsteği Hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu.' });  // Hata durumunda istemciye hata mesajı gönder
    }
};

exports.nonceMetaMaskAccount = async function (req, res) {
    const signingKey = nacl.sign.keyPair();
    const verifyKey = signingKey.publicKey;
    const verifyKeyBytes = naclUtil.encodeBase64(verifyKey);

    const walletAddress = req.body.userAccount;

    const message = naclUtil.decodeUTF8(walletAddress); // Convert message to bytes
    console.log("message",message)

    const signedMessage = nacl.sign(message, signingKey.secretKey);
    const nonce = naclUtil.encodeBase64(signedMessage);

    console.log("Signed Message:", naclUtil.encodeBase64(signedMessage));
    console.log("Verify Key (Base64):", verifyKeyBytes);

    return res.json({
        publicKey: verifyKeyBytes,
        signedMessage: nonce,
    });
};