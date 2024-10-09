const express = require("express");
const router = express.Router();

/* controllers */
const PageController = require("../controllers/pageController");

/* methods */
router.get("/", PageController.getHomePage);
router.post('/twitter/add', PageController.addTwitterAccount);
router.post("/metamask/add", PageController.addMetaMaskAccount);
router.post("/metamask/nonce", PageController.nonceMetaMaskAccount);
// router.get("/get_nonce", PageController.signMessage);



module.exports = router;