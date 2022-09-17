const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");

router.get("/:slug", newsController.show);
// Move / behind
router.get("/", newsController.index);

module.exports = router;
