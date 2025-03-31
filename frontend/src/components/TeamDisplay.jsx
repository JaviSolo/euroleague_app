import React from "react";
import { Link } from "react-router-dom";

const TeamDisplay = ({ team, fallback }) => {
  const displayName = team?.["club.name"] || fallback;

  // Convierte a slug: "FC Barcelona" => "fc-barcelona"
  const slug = displayName.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`/team/${slug}`}
      className="flex items-center gap-2 hover:underline hover:text-blue-400"
    >
      {team?.["club.images.crest"] ? (
        <img
          src={team["club.images.crest"]}
          alt={displayName}
          className="w-6 h-6"
        />
      ) : null}
      <span className="text-white font-medium">{displayName}</span>
    </Link>
  );
};

export default TeamDisplay;
