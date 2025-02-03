from flask import Flask, request, jsonify
from flask_cors import CORS
from cod_api import API, platforms  # Import the Call of Duty API wrapper

app = Flask(__name__)
CORS(app)  # Allow frontend requests

cod_api = API()  # Initialize the API

@app.route("/api/authenticate", methods=["POST"])
def authenticate():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Missing username or password"}), 400

    try:
        # Log in with SSO Token (replace with actual auth method)
        cod_api.login(password)  # In CoD API, SSO token is used as a "password"

        return jsonify({"success": True, "username": username, "message": "Login successful"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 401

@app.route("/api/stats", methods=["POST"])
def get_stats():
    data = request.json
    username = data.get("username")
    platform = platforms.Activision  # Adjust platform based on user input if needed

    if not username:
        return jsonify({"success": False, "message": "Username required"}), 400

    try:
        stats = cod_api.Warzone2.fullData(platform, username)  # Fetch Warzone2 stats
        return jsonify({"success": True, "username": username, "stats": stats})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)