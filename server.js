require("dotenv").config();
const express = require("express");
const mysql = require("mysql2"); // Use mysql2 for better support
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // Render database host (not localhost)
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,  // MySQL default port
    ssl: {
        rejectUnauthorized: true // Use this if Render requires SSL
    }
});

// Connect to MySQL with error handling
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if database connection fails
    }
    console.log("✅ Connected to MySQL Database!");
});

// Keep MySQL connection alive (prevents disconnect)
setInterval(() => {
    db.ping((err) => {
        if (err) console.error("MySQL ping failed:", err);
    });
}, 30000); // Every 30 seconds

// API Endpoint to Submit Score
app.post("/submit-score", (req, res) => {
    const { username, score, time_taken } = req.body;

    if (!username || score === undefined || time_taken === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO quiz_results (username, score, time_taken) VALUES (?, ?, ?)";
    
    db.query(sql, [username, score, time_taken], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            return res.status(500).json({ error: "Error saving score" });
        }
        res.json({ message: "✅ Score saved successfully!" });
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
