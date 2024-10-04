
exports.getHomePage = function (req, res) {
    const token = req.query.token;
    res.render('home', {
        title: 'Home',
        token: token
    });
}
