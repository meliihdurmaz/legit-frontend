const express = require("express");
const router = express.Router();

/* controllers */
const PageController = require("../controllers/pageController");

/* methods */
router.get("/", PageController.getHomePage);
router.post('/twitter/add', PageController.addTwitterAccount);


module.exports = router;