"use client";
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function DeveloperProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:5000/api/developers/${username}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [username]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{profile.profile.login}</h1>
      <img
        src={profile.profile.avatar_url}
        alt={profile.profile.login}
        width={100}
        style={{ borderRadius: "50%" }}
      />
      <p>Followers: {profile.followers_count}</p>

      <h2>Top Languages</h2>
      <ul>
        {profile.top_languages.map((lang) => (
          <li key={lang.language}>
            {lang.language}: {lang.count}
          </li>
        ))}
      </ul>

      <h2>Repositories</h2>
      <ul>
        {profile.repos.map((repo) => (
          <li key={repo.name}>
            {repo.name} ⭐{repo.stars} 🍴{repo.forks} ({repo.language})
          </li>
        ))}
      </ul>
    </div>
  );
}
