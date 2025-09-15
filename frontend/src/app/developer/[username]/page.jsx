"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// 🎨 Language colors (extend as needed)
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  C: "#555555",
  Cpp: "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  default: "#8884d8",
};

export default function DeveloperProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [compareUser, setCompareUser] = useState("");
  const [compareProfile, setCompareProfile] = useState(null);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:5000/api/developers/${username}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [username]);

  const handleCompare = async () => {
    if (!compareUser) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/developers/${compareUser}`
      );
      setCompareProfile(res.data);
    } catch (err) {
      console.error("Error fetching comparison profile:", err);
    }
  };

  if (!profile) return <p className="text-center text-gray-400">Loading...</p>;

  // Build comparison chart data
  let comparisonData = [];
  if (profile && compareProfile) {
    const profileStars = profile.repos.reduce((sum, r) => sum + r.stars, 0);
    const profileForks = profile.repos.reduce((sum, r) => sum + r.forks, 0);
    const compareStars = compareProfile.repos.reduce((sum, r) => sum + r.stars, 0);
    const compareForks = compareProfile.repos.reduce((sum, r) => sum + r.forks, 0);

    comparisonData = [
      {
        metric: "Followers",
        [profile.profile.login]: profile.followers_count,
        [compareProfile.profile.login]: compareProfile.followers_count,
      },
      {
        metric: "Stars",
        [profile.profile.login]: profileStars,
        [compareProfile.profile.login]: compareStars,
      },
      {
        metric: "Forks",
        [profile.profile.login]: profileForks,
        [compareProfile.profile.login]: compareForks,
      },
      {
        metric: "Repos",
        [profile.profile.login]: profile.repos.length,
        [compareProfile.profile.login]: compareProfile.repos.length,
      },
    ];
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={profile.profile.avatar_url}
          alt={profile.profile.login}
          className="w-28 h-28 rounded-full border-4 border-gray-700"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile.profile.login}</h1>
          <p className="text-gray-400">{profile.profile.name}</p>
          <p className="mt-2">
            Followers:{" "}
            <span className="font-semibold text-blue-400">
              {profile.followers_count}
            </span>
          </p>
        </div>
      </div>

      {/* Compare Input */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🔍 Compare with another developer</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={compareUser}
            onChange={(e) => setCompareUser(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 flex-1"
          />
          <button
            onClick={handleCompare}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Compare
          </button>
        </div>
      </div>

      {/* Top Languages Pie Chart */}
      <h2 className="text-2xl font-semibold mb-4">Top Languages</h2>
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-10">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={profile.top_languages}
              dataKey="count"
              nameKey="language"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {profile.top_languages.map((lang, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.default}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Repository Leaderboard */}
      <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
      <div className="flex flex-col gap-4 mb-12">
        {profile.repos
          .sort((a, b) => b.stars - a.stars)
          .map((repo, index) => (
            <div
              key={repo.name}
              className="flex justify-between items-center bg-gray-900 p-4 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              <div>
                <p className="font-bold text-lg">
                  {index + 1}. {repo.name}
                </p>
                <p className="text-sm text-gray-400">{repo.language || "N/A"}</p>
              </div>
              <div className="flex gap-6 text-sm">
                <span>⭐ {repo.stars}</span>
                <span>🍴 {repo.forks}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Comparison Section */}
      {compareProfile && (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">⚔️ Comparison</h2>

          {/* Side-by-side summary */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* First Dev */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{profile.profile.login}</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Followers: {profile.followers_count}</li>
                <li>Top Language: {profile.top_languages[0]?.language || "N/A"}</li>
                <li>
                  Top Repo:{" "}
                  {profile.repos.sort((a, b) => b.stars - a.stars)[0]?.name || "N/A"}
                </li>
              </ul>
            </div>
            {/* Second Dev */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{compareProfile.profile.login}</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Followers: {compareProfile.followers_count}</li>
                <li>
                  Top Language: {compareProfile.top_languages[0]?.language || "N/A"}
                </li>
                <li>
                  Top Repo:{" "}
                  {compareProfile.repos.sort((a, b) => b.stars - a.stars)[0]?.name ||
                    "N/A"}
                </li>
              </ul>
            </div>
          </div>

          {/* Bar Chart Comparison */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={profile.profile.login}
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey={compareProfile.profile.login}
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
