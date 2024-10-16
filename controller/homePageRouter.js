const express = require("express");
const router = express.Router();

/* controllers */
const homePageController = require("../service/homePageController");
const PageController = require("../service/pageController");

/* methods */
router.get("/", PageController.getHomePage);
router.get('/twitter/login', PageController.twitterLogin);
router.get("/telegram", homePageController.telegramLogin);
router.get("/telegramCallback", homePageController.telegramCallback);
router.post("/getAccounts", PageController.getAccounts);




module.exports = router;