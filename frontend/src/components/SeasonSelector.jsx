import React from "react";

const generateSeasons = (startYear = 2000) => {
  const currentYear = new Date().getFullYear();
  const seasons = [];
  for (let year = currentYear; year >= startYear; year--) {
    seasons.push(`${year}-${year + 1}`);
  }
  return seasons;
};

const SeasonSelector = ({ selectedSeason, onChange }) => {
  const seasons = generateSeasons();

  return (
    <div className="flex justify-center mt-6">
      <label className="text-gray-300 mr-3 self-center text-sm md:text-base">
        Select season:
      </label>
      <select
        value={selectedSeason}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm md:text-base"
      >
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
