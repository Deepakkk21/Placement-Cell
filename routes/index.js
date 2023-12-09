
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

const Authentication = require("../config/middleware");

router.get("/", Authentication.isAuthenticate, homeController.home);
router.use("/employee", require("./employee"));

router.use("/student", require("./student"));

module.exports = router;