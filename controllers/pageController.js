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


    const hedefURL = 'https://3638-78-177-177-231.ngrok-free.app/metamask/add';
    try {
        const response = await axios.post(hedefURL, { signature, nonce, walletAddress }, {  // req.body'yi doğrudan gönderiyoruz
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

exports.signMessage = async function (req, res) {
    const token = req.query.token; // JWT token
    const walletAddress = req.query.walletAddress;
    const decodedToken = jwt.verify(token, '4w7gTDF9yc4uH6HO8O4Dx9ILeg60SjhdN4995yWB');  // JWT için gizli anahtar
    const userId = decodedToken.id;




    const msg = `Sign this message to authenticate with user ID: ${userId}`;





    if (!signedMessage || !walletAddress) {
        return res.status(400).json({ message: 'Invalid signing process.' });
    }
    const base64SignedMessage = Buffer.from(signedMessage).toString('base64');
    const base64PublicKey = Buffer.from(publicKeyPair).toString('base64');
    const payload = {
        signedMessage: base64SignedMessage,          // Base64 formatında imzalı mesaj
        accountAddress: walletAddress,               // Hesap adresi
        signaturePublicKey: base64PublicKey,         // Public key'i Base64 olarak kodla
    };

    try {
        const response = await axios.post('https://3638-78-177-177-231.ngrok-free.app/metamask/add', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("Decrypted Message from FastAPI:", response.data.decrypted_message);
        res.json({ decryptedMessage: response.data.decrypted_message });
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ message: 'An error occurred during the signing process.' });
    }
};

function signNonce(nonce, secretKey) {
    const keypair = nacl.sign.keyPair.fromSecretKey(Buffer.from(secretKey));
    const nonceBuffer = new TextEncoder().encode(nonce);
    const signature = nacl.sign.detached(nonceBuffer, keypair.secretKey);
    return { signature: Buffer.from(signature).toString('hex'), publicKey: Buffer.from(keypair.publicKey).toString('hex') };
}
exports.nonceMetaMaskAccount = async function (req, res) {
    const token = req.headers.authorization.split(' ')[1];  // Authorization başlığından token'ı ayır
    console.log(req.body);
    const walletAddress = req.body.accounts;
    const keypair = nacl.sign.keyPair();
    const { signature, publicKey } = signNonce(walletAddress, keypair.secretKey);
    console.log("Imzalı Nonce:", signature);
    console.log("Açık Anahtar:", publicKey);
    return res.json({
        publicKey: Array.from(publicKey), // Public key'i döndür
        signedMessage: Array.from(signature), // İmzalı mesajı döndür
        walletAddress: walletAddress // Cüzdan adresini döndür
    });
};