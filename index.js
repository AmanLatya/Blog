const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const pool = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

//use cors middleware
app.use(cors());
app.use(express.json());

// Test API to check database connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json({
        message: "API is working",
    });
    console.log(result);
})

app.get("/", (req, res) => {
    res.send("Blog API Running!");
})

app.get("/db-check", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.json(result.rows[0]);
});


app.use("/api/auth", authRoutes);

const authMiddleware = require("./src/middlewares/authMiddleware");
const roleMiddleware = require("./src/middlewares/roleMiddleware");

app.get("/api/test/writer", authMiddleware, roleMiddleware(['writer', 'admin']),
    (req, res) => {
        res.json({ message: "Welcome Boss ..." })
    }
)


const postRoutes = require("./src/routes/postRoutes");
app.use("/api/posts", postRoutes);

const commentRoutes = require("./src/routes/commentRoutes");

app.use("/api/comments", commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})
