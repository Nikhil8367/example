const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quizdb"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database");
});

// API to fetch quiz questions
app.get("/questions", (req, res) => {
    db.query("SELECT * FROM questions", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Failed to fetch data" });
        } else {
            res.json(results);
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
