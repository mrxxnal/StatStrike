// Function to Show Tabs Dynamically
function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    showTab("login");

    // Add smooth shake effect for 0.7 seconds
    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
        document.body.classList.add("smooth-stop"); // Eases into rest
    }, 700); // Now it's only 0.7 seconds!
});

// Handle User Login and Redirect to Dashboard
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
            // Store user data in localStorage before redirecting
            localStorage.setItem("codUsername", data.username);
            localStorage.setItem("playerStats", JSON.stringify(data));

            // Redirect to the dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error fetching player data:", error);
        document.getElementById("player-stats").innerHTML = "<p>Failed to fetch stats. Try again later.</p>";
    });
});