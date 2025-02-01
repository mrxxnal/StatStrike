// Function to Show Tabs Dynamically
function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

// Default: Show Introduction Tab
document.addEventListener("DOMContentLoaded", () => {
    showTab("introduction");

    // Trigger explosion effect on page load
    const explosion = document.getElementById("explosion-container");
    const body = document.body;

    if (explosion) {
        // Add screen shake effect
        body.classList.add("shake");

        // Remove explosion & shake after 7 seconds
        setTimeout(() => {
            explosion.classList.add("hidden");
            body.classList.remove("shake");
        }, 7000);
    }
});

// Handle User Login and Fetch Stats
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("cod-username").value;
    const password = document.getElementById("cod-password").value;

    if (!username || !password) {
        alert("Please enter both your username and password!");
        return;
    }

    fetch("http://your-ec2-ip:5001/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("player-stats").innerHTML = `
                <h3>${data.username}</h3>
                <p><strong>K/D Ratio:</strong> ${data.kdRatio}</p>
                <p><strong>Total Kills:</strong> ${data.kills}</p>
                <p><strong>Wins:</strong> ${data.wins}</p>
            `;
        } else {
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error fetching player data:", error);
        document.getElementById("player-stats").innerHTML = "<p>Failed to fetch stats. Try again later.</p>";
    });
});