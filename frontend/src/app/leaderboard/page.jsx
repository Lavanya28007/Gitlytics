"use client";
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";

export default function Leaderboard() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        // 1️⃣ Get list of developers (basic info)
        const res = await axios.get(
          "http://localhost:5000/api/developers?location=india&language=javascript"
        );
        const devList = res.data.developers;

        // 2️⃣ Fetch detailed profile for each developer in parallel
        const detailedProfiles = await Promise.all(
          devList.map(async (dev) => {
            try {
              const profileRes = await axios.get(
                `http://localhost:5000/api/developers/${dev.username}`
              );
              return { ...dev, details: profileRes.data };
            } catch (err) {
              console.error(`Error fetching profile for ${dev.username}`, err);
              return dev; // fallback if one profile fails
            }
          })
        );

        setDevelopers(detailedProfiles);
      } catch (err) {
        console.error("Error fetching developers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading leaderboard...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">🏆 Top Developers</h1>

      <div className="flex flex-col gap-6">
        {developers.map((dev, index) => {
          const details = dev.details || {};
          return (
            <ProfileCard
              key={dev.username}
              rank={index + 1}
              name={details.profile?.name || dev.username}
              username={dev.username}
              location={details.profile?.location || "Unknown"}
              avatar={dev.avatar}
              tags={details.top_languages?.slice(0, 3).map((l) => l.language) || []}
              stars={details.repos?.reduce((sum, r) => sum + r.stars, 0) || 0}
              forks={details.repos?.reduce((sum, r) => sum + r.forks, 0) || 0}
              followers={details.followers_count || 0}
              contributions={details.repos?.length || 0}
              repo={
                details.repos?.sort((a, b) => b.stars - a.stars)[0]?.name || "N/A"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
