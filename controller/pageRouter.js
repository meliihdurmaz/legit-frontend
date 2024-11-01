const express = require("express");
const router = express.Router();

/* controllers */
const PageController = require("../service/pageController");

/* methods */
router.get("/", PageController.getHomePage);

router.post('/twitter/add', PageController.addTwitterAccount);
router.post("/metamask/add", PageController.addMetaMaskAccount);
router.post("/metamask/nonce", PageController.nonceMetaMaskAccount);
router.post('/metamask/login', PageController.loginMetaMaskAccount);



module.exports = router;