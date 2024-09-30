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