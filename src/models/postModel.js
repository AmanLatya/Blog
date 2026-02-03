const pool = require("../config/db");

const createPost = async (userId, title, content, tags, status) => {
  const result = await pool.query(
    `INSERT INTO posts (user_id, title, content, tags, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, title, content, tags, status]
  );
  return result.rows[0];
};

const getPublishedPosts = async (limit, offset, search) => {
  let query = `
    SELECT posts.*, users.name AS author
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE status = 'published'
  `;

  let values = [];

  if (search) {
    query += `
      AND (
        title ILIKE $1 OR
        content ILIKE $1 OR
        EXISTS (
          SELECT 1 FROM unnest(tags) t WHERE t ILIKE $1
        )
      )
    `;
    values.push(`%${search}%`);
  }

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const result = await pool.query(query, values);
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const updatePost = async (id, title, content, tags, status) => {
  const result = await pool.query(
    `UPDATE posts
     SET title = $1, content = $2, tags = $3, status = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, content, tags, status, id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
};

module.exports = {
  createPost,
  getPublishedPosts,
  getPostById,
  updatePost,
  deletePost,
};
