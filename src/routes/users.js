const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UsersController");
const { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } = require("../middleware/auth");

router.get("/admin", [
    verifyToken,
    isAdmin
], usersController.getAdmin);

router.get("/moderator", [
    verifyToken,
    isModerator
], usersController.getModerator);

router.get("/:id", [
    verifyToken,
    isModeratorOrAdmin
], usersController.getUser);

router.get("/", [
    verifyToken
], usersController.getAll);


module.exports = router;
