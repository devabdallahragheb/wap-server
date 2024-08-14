const express = require("express");
const router = express.Router();
const homeController = require("../controller/home.controller");
const verifyToken = require("../utils/verifyUser");
// CRUD Routes
router.post("/",verifyToken, homeController.createHome);
router.get("/", homeController.getAllHomes);
router.get("/:id", homeController.getHomeById);
router.post("/:id", verifyToken, homeController.updateHome);
router.delete("/:id", verifyToken, homeController.deleteHome);

module.exports = router;
