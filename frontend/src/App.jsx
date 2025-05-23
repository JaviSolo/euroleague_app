import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StandingsTable from "./components/StandingsTable";
import ScheduledMatches from "./components/ScheduledMatches";
import LiveMatches from "./components/LiveMatches";
import PlayedMatches from "./components/PlayedMatches";
import TeamPage from "./components/TeamPage"; // 🔜 Lo crearemos luego

const Dashboard = () => (
  <div className="min-h-screen bg-gray-900 text-white p-6">
    {/* Header Section */}
    <header className="text-center mb-6">
      <h1 className="text-4xl font-bold text-blue-600">Euroleague Live Dashboard</h1>
      <p className="mt-2 text-xl">Stay updated with the latest scores and stats</p>
    </header>

    {/* Main Content Section */}
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Played Matches Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <PlayedMatches />
      </div>

      {/* Live Matches Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <LiveMatches />
      </div>

      {/* Upcoming Matches Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ScheduledMatches />
      </div>

      {/* Standings Section */}
      <StandingsTable />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/team/:teamName" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
