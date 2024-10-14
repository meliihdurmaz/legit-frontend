const express = require("express");
const router = express.Router();

/* controllers */
const homePageController = require("../controllers/homePageController");
const PageController = require("../controllers/pageController");

/* methods */
router.get("/", PageController.getHomePage);
router.get('/twitter/login', PageController.twitterLogin);
router.get("/telegram", homePageController.telegramLogin);
router.get("/telegramCallback", homePageController.telegramCallback);




module.exports = router;