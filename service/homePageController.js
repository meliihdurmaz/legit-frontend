const axios = require('axios');





exports.getHomePage = function (req, res) {
    res.render('home', {
        title: 'Home',
    });
};