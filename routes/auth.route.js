const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// CRUD Routes
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
