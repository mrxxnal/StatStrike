document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("codUsername");
    const stats = JSON.parse(localStorage.getItem("playerStats"));

    if (!username || !stats) {
        window.location.href = "index.html"; // Redirect if not logged in
    }

    document.getElementById("player-name").innerText = username;

    document.getElementById("player-stats").innerHTML = `
        <p><strong>K/D Ratio:</strong> ${stats.kdRatio}</p>
        <p><strong>Total Kills:</strong> ${stats.kills}</p>
        <p><strong>Wins:</strong> ${stats.wins}</p>
    `;

    // Fetch leaderboard data
    fetch("http://your-ec2-ip:5001/api/leaderboard")
        .then(response => response.json())
        .then(data => {
            let leaderboardHTML = "<ol>";
            data.forEach(player => {
                leaderboardHTML += `<li>${player.username} - K/D Ratio: ${player.kdRatio}</li>`;
            });
            leaderboardHTML += "</ol>";
            document.getElementById("leaderboard-container").innerHTML = leaderboardHTML;
        })
        .catch(error => {
            console.error("Error loading leaderboard:", error);
            document.getElementById("leaderboard-container").innerHTML = "<p>Failed to load leaderboard.</p>";
        });
});