const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// CRUD Routes
router.post("/signup", authController.signUp);
router.post("/signin", authController.signin);

module.exports = router;
