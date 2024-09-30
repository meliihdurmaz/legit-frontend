function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
}

document.addEventListener('DOMContentLoaded', function () {
    // localStorage'dan token'ı al
    // const token = localStorage.getItem('bearerToken');

    if (token) {
        // Token'ı çözümle
        const decodedToken = parseJwt(token);
        // Kullanıcı adını sayfada göster
        document.getElementById('username').textContent = decodedToken.username;

    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('bearerToken', token);
        } else {
            alert('Lütfen giriş yapın.');
            window.location.href = '/index.html';
        }
    }
    load();
});
async function startTwitterConnect() {
    const token = localStorage.getItem('bearerToken');
    const authUrl = `http://127.0.0.1:8000/twitter/authorizeUrl`;
    try {
        const response = await fetch(authUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = data; // Assuming the server responds with the authorization URL
        } else {
            document.getElementById('twitter-error-message').innerText = 'Twitter connection failed: ' + response.statusText;
        }
    } catch (error) {
        document.getElementById('twitter-error-message').innerText = 'An error occurred: ' + error.message;
    }
}