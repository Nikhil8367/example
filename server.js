const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if you set a password
    password: "Nikhil@834134",
    database: "quiz_db",
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// API to receive quiz results
app.post("/submit-score", (req, res) => {
    const { username, score, time_taken } = req.body;
    const sql = "INSERT INTO quiz_results (username, score, time_taken) VALUES (?, ?, ?)";
    
    db.query(sql, [username, score, time_taken], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error saving score");
        } else {
            res.json({ message: "Score saved successfully!" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
