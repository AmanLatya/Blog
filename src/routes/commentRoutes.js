const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { addCommentHandler, deleteCommentHandler } = require("../controllers/commentController");

const router = express.Router();

router.post("/", authMiddleware, addCommentHandler);
router.delete("/:id", authMiddleware, deleteCommentHandler);

module.exports = router;
