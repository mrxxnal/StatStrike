require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const COD_API_KEY = process.env.COD_API_KEY;

app.get("/api/stats", async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: "Username required" });

    try {
        const response = await axios.get(`https://api.tracker.gg/api/v2/warzone/standard/profile/psn/${username}`, {
            headers: { "TRN-Api-Key": COD_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));