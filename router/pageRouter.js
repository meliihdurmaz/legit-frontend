const express = require("express");
const router = express.Router();

/* controllers */
const PageController = require("../controllers/pageController");

/* methods */
router.get("/", PageController.getHomePage);


module.exports = router;