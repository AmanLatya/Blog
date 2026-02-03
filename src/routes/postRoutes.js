const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
    createPostHandler,
    getPostsHandler,
    updatePostHandler,
    deletePostHandler,
} = require("../controllers/postController");

const router = express.Router();

// public
router.get("/", getPostsHandler);

// writer/admin
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["writer", "admin"]),
    createPostHandler
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["writer", "admin"]),
    updatePostHandler
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["writer", "admin"]),
    deletePostHandler
);

module.exports = router;
