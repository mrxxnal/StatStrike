const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = {
    "testUser": { password: "testPass", kdRatio: 1.5, kills: 250, wins: 50 },
    "proGamer": { password: "codMaster", kdRatio: 2.7, kills: 1000, wins: 200 }
};

// Authentication Route
app.post("/api/authenticate", (req, res) => {
    const { username, password } = req.body;
    
    if (users[username] && users[username].password === password) {
        res.json({ success: true, username, ...users[username] });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

app.listen(5001, () => console.log("Server running on port 5001"));