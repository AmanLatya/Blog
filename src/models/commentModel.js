const pool = require("../config/db.js");

const createComment = async (userId, postId, content) => {
  const result = await pool.query(
    `INSERT INTO comments (user_id, post_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, postId, content]
  );
  return result.rows[0];
};

const getCommentById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM comments WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const deleteComment = async (id) => {
  await pool.query("DELETE FROM comments WHERE id = $1", [id]);
};

const getPostStatus = async (postId) => {
  const result = await pool.query(
    "SELECT status FROM posts WHERE id = $1",
    [postId]
  );
  return result.rows[0];
};

module.exports = {
  createComment,
  getCommentById,
  deleteComment,
  getPostStatus,
};
