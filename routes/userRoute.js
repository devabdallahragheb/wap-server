const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// CRUD Routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
