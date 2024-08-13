const express = require("express");
const router = express.Router();
const homeController = require("../controller/home.controller");
const verifyToken = require("../utils/verifyUser");
// CRUD Routes
router.post("/", homeController.createHome);
router.get("/", verifyToken, homeController.getAllHomes);
router.get("/:id", verifyToken, homeController.getHomeById);
router.post("/:id", verifyToken, homeController.updateHome);
router.delete("/:id", verifyToken, homeController.deleteHome);

module.exports = router;
