const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getPlayerStats } = require("./cod_api");  // Import the API function

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Authentication & Stats Route
app.post("/api/authenticate", async (req, res) => {
    const { username, password, platform } = req.body;

    if (!username || !password || !platform) {
        return res.status(400).json({ success: false, message: "Missing credentials or platform" });
    }

    try {
        const stats = await getPlayerStats(username, platform, password);

        if (stats.success) {
            return res.json({ success: true, username, ...stats });
        } else {
            return res.status(401).json({ success: false, message: stats.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

app.listen(5001, () => console.log("Server running on port 5001"));