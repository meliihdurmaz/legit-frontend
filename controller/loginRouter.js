const express = require("express");
const router = express.Router();

const loginController = require("../service/loginController");

router.get('/twitter', loginController.twitterLogin);

router.get("/telegram", loginController.telegramLogin);
router.get("/connectTelegram", loginController.connectTelegram);
router.get("/telegramCallback", loginController.telegramCallback);

module.exports = router;