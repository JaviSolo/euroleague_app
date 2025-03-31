import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SeasonSelector from "../components/SeasonSelector";
import TeamTabs from "./TeamTabs";

const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("2024-2025"); // 👈 Por defecto, temporada actual

  useEffect(() => {
    fetch("/data/teams_metadata.json")
      .then((res) => res.json())
      .then((data) => {
        const matchedTeam = data[teamName.toLowerCase()];
        setTeam(matchedTeam || null);
      })
      .catch((err) => console.error("Error loading team data:", err));
  }, [teamName]);

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
        <h2 className="text-2xl font-bold text-red-400">Team Not Found</h2>
        <p className="text-gray-400 mt-2">
          We couldn't find this team in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Team Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-800 p-6 rounded-xl shadow-lg">
          <img
            src={`/images/teams/${teamName}/logo/logo.png`}
            alt={`${team.name} logo`}
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              {team.name}
            </h1>
            <p className="text-gray-300">
              {showFullDesc
                ? team.description
                : `${team.description.slice(0, 250)}...`}
            </p>
            {team.description.length > 250 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-2 text-sm text-blue-400 hover:underline"
              >
                {showFullDesc ? "Show less" : "Show more"}
              </button>
            )}
            <div className="text-sm text-gray-400 mt-4 space-y-1">
              <p>
                <strong>City:</strong> {team.city || "Unknown"}
              </p>
              <p>
                <strong>Founded:</strong> {team.founded || "Unknown"}
              </p>
              <p>
                <strong>Stadium:</strong> {team.arena.name || "Unknown"}{" "}
                ({team.arena.capacity || "?"} seats)
              </p>
            </div>
          </div>
        </div>

        {/* Stadium Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={`/images/teams/${teamName}/stadium_exterior/exterior.jpg`}
            alt="Stadium Exterior"
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
          <img
            src={`/images/teams/${teamName}/stadium_interior/interior.jpg`}
            alt="Stadium Interior"
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
        </div>

       {/* 🔽 Season Selector */}
        <SeasonSelector
        selectedSeason={selectedSeason}
        onChange={(season) => setSelectedSeason(season)}
        />

        {/* ✅ Tabs con stats, roster, boxscores */}
        <TeamTabs
        teamName={team.name}
        selectedSeason={selectedSeason}
        />
      </div>
    </div>
  );
};

export default TeamPage;
