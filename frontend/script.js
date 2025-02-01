function fetchStats() {
    const username = document.getElementById("cod-username").value;
    fetch(`http://your-ec2-ip:5001/api/stats?username=${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("player-stats").innerHTML = `
                <h3>${data.username}</h3>
                <p>K/D Ratio: ${data.kdRatio}</p>
                <p>Total Kills: ${data.kills}</p>
            `;
        })
        .catch(error => console.error("Error fetching data:", error));
}