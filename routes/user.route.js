const express = require("express");
const router = express.Router();
const userController = require("../controller/user.Controller");
const verifyToken = require("../utils/verifyUser");

// CRUD Routes
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.get("/homes/:id", verifyToken, userController.getMyHomes);
router.post("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
