const {
    createComment,
    getCommentById,
    deleteComment,
    getPostStatus,
} = require("../models/commentModel");

const addCommentHandler = async (req, res) => {
    try {
        const { postId, content } = req.body;

        if (!postId || !content) {
            return res.status(400).json({ message: "Comment content required" });
        }

        const post = await getPostStatus(postId);
        if (!post || post.status !== "published") {
            return res.status(400).json({ message: "Cannot comment on this post" });
        }

        const comment = await createComment(req.user.id, postId, content);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteCommentHandler = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (req.user.role !== "admin" && comment.user_id !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await deleteComment(commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addCommentHandler,
    deleteCommentHandler,
};
