
exports.getHomePage = function (req, res) {
    const token = req.query.token;
    console.log('Token:', token);
    res.render('home', {
        title: 'Home',
        token: token
    });
}
