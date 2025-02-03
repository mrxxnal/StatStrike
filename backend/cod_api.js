const fetch = require("node-fetch");

const COD_API_BASE_URL = "https://my.callofduty.com/api/papi-client";

// Function to login & get player data
async function getPlayerStats(username, platform, token) {
    const endpoint = `${COD_API_BASE_URL}/stats/cod/v1/title/mw/platform/${platform}/gamer/${encodeURIComponent(username)}/profile/type/mp`;

    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Connection": "Keep-Alive",
        "Cookie": `ACT_SSO_COOKIE=${token}; new_SiteId=cod`
    };

    try {
        const response = await fetch(endpoint, { method: "GET", headers });
        const data = await response.json();

        if (data.status === "success") {
            return {
                success: true,
                kdRatio: data.data.lifetime.all.properties.kdRatio,
                kills: data.data.lifetime.all.properties.kills,
                wins: data.data.lifetime.all.properties.wins
            };
        } else {
            return { success: false, message: "Invalid credentials or account not found" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = { getPlayerStats };