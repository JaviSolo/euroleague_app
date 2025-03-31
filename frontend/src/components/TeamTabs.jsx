import React, { useState } from "react";
import TeamStatisticsTab from "./TeamStatisticsTab";
// import RosterTab from "./RosterTab"; // futuras pestañas
// import BoxScoresTab from "./BoxScoresTab"; // futuras pestañas

const TeamTabs = ({ teamName, selectedSeason }) => {
  const [activeTab, setActiveTab] = useState("stats");

  const tabs = [
    {
      id: "stats",
      label: "Season Stats",
      content: (
        <TeamStatisticsTab teamName={teamName} season={selectedSeason} />
      ),
    },
    // {
    //   id: "roster",
    //   label: "Roster",
    //   content: <RosterTab teamName={teamName} season={selectedSeason} />,
    // },
    // {
    //   id: "boxscores",
    //   label: "Box Scores",
    //   content: <BoxScoresTab teamName={teamName} season={selectedSeason} />,
    // },
  ];

  return (
    <div className="mt-8">
      {/* Tab buttons */}
      <div className="flex space-x-4 border-b border-gray-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm md:text-base transition-colors duration-200 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-400 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default TeamTabs;
