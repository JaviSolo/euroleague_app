from flask import Blueprint, request, jsonify
from euroleague_api_wrappers.team_stats_wrapper import get_team_stats

# Crea el blueprint sin incluir /api en la ruta aquí
team_stats_bp = Blueprint("team_stats", __name__)
print("✅ team_stats.py loaded")

@team_stats_bp.route("/team_stats", methods=["GET"])
def team_stats():
    team = request.args.get("team")
    season = request.args.get("season")

    if not team or not season:
        return jsonify({"error": "Missing team or season"}), 400

    try:
        print(f"📥 /api/team_stats HIT → team={team}, season={season}")
        stats = get_team_stats(team, season)
        return jsonify(stats)
    except Exception as e:
        print(f"[ERROR] team_stats: {e}")
        return jsonify({"error": "Failed to fetch stats"}), 500
