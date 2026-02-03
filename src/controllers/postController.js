const {
    createPost,
    getPublishedPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../models/postModel");

const createPostHandler = async (req, res) => {
    console.log(req.body);
    try {
        const { title, content, tags, status } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        const post = await createPost(
            req.user.id,
            title,
            content,
            tags || [],
            status || "draft"
        );

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getPostsHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const search = req.query.search || "";

        const posts = await getPublishedPosts(limit, offset, search);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const updatePostHandler = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, tags, status } = req.body;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ownership check
        if (req.user.role !== "admin" && post.user_id !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedPost = await updatePost(
            postId,
            title || post.title,
            content || post.content,
            tags || post.tags,
            status || post.status
        );

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deletePostHandler = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ownership check
        if (req.user.role !== "admin" && post.user_id !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await deletePost(postId);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createPostHandler,
    getPostsHandler,
    updatePostHandler,
    deletePostHandler,
};
