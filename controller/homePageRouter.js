const express = require("express");
const router = express.Router();

/* controllers */
const homePageController = require("../service/homePageController");

// /* methods */
router.get("/", homePageController.getHomePage);

router.post("/getAccounts", homePageController.getAccounts);
router.post("/addTelegramAccount", homePageController.addTelegramAccount);
router.get("/getTelegramInvites", homePageController.getTelegramInvites);
router.post("/acceptInvite", homePageController.acceptInvite);
router.post("/tokenSave", homePageController.tokenSave);




module.exports = router;