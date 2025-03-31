import React, { useEffect, useState } from "react";

const COLUMNS_ORDER = [
  "gamesPlayed", "minutesPlayed", "pointsScored",
  "totalRebounds", "offensiveRebounds", "defensiveRebounds",
  "assists", "steals", "blocks", "blocksAgainst",
  "turnovers", "foulsCommited", "foulsDrawn",
  "twoPointersPercentage", "threePointersPercentage", "freeThrowsPercentage",
  "pir"
];

const COLUMN_LABELS = {
  gamesPlayed: "GP",
  minutesPlayed: "MIN",
  pointsScored: "PTS",
  totalRebounds: "REB",
  offensiveRebounds: "OREB",
  defensiveRebounds: "DREB",
  assists: "AST",
  steals: "STL",
  blocks: "BLK",
  blocksAgainst: "BLK Against",
  turnovers: "TO",
  foulsCommited: "Fouls Com.",
  foulsDrawn: "Fouls Rec.",
  twoPointersPercentage: "2P%",
  threePointersPercentage: "3P%",
  freeThrowsPercentage: "FT%",
  pir: "PIR",
};

const TeamStatisticsTab = ({ teamName, season }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/team_stats?team=${teamName}&season=${season}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching team stats:", error);
        setStats(null);
      }
      setLoading(false);
    };

    fetchStats();
  }, [teamName, season]);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading stats...</p>;
  }

  if (!stats) {
    return (
      <p className="text-red-400 text-center">
        No statistics available for this team and season.
      </p>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg overflow-x-auto">
      <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        Team Statistics — {season}
      </h3>
      <table className="w-full text-sm md:text-base text-center border-collapse">
        <thead>
          <tr className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
            {COLUMNS_ORDER.map((col) => (
              <th key={col} className="px-4 py-2 whitespace-nowrap">
                {COLUMN_LABELS[col] || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-700 text-white font-medium hover:bg-gray-600">
            {COLUMNS_ORDER.map((col) => (
              <td key={col} className="px-4 py-2 whitespace-nowrap">
                {stats[col] !== undefined ? stats[col] : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeamStatisticsTab;
