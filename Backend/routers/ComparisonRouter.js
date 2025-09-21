// routes/comparisonRouter.js
const express = require("express");
const axios = require("axios");
const Comparison = require("../models/ComparisonModel");
const auth = require("../middleware/auth");

const router = express.Router();

const GITHUB_API = "https://api.github.com/users";

// Fetch GitHub user details
async function fetchGithubUser(username) {
  if (!username || typeof username !== "string") {
    throw new Error("Invalid GitHub username");
  }
  try {
    const res = await axios.get(`${GITHUB_API}/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    return {
      username: res.data.login,
      profileUrl: res.data.html_url,
      followers: res.data.followers,
      publicRepos: res.data.public_repos,
      following: res.data.following,
      stars: res.data.public_stars,
    };
  } catch (err) {
    throw new Error(`Failed to fetch GitHub user: ${username}`);
  }
}


// Compare developers
router.post("/compare", auth, async (req, res) => {
  console.log(req.userId);
  
  const { dev1Username, dev2Username } = req.body;
  if (!dev1Username || !dev2Username) {
    return res.status(400).json({ error: "Both developer usernames are required" });
  }

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized: user ID missing" });
  }

  try {
    const [dev1, dev2] = await Promise.all([
      fetchGithubUser(dev1Username),
      fetchGithubUser(dev2Username),
    ]);

    const score1 = dev1.followers * 2 + dev1.publicRepos;
    const score2 = dev2.followers * 2 + dev2.publicRepos;

    let winner = "tie";
    if (score1 > score2) winner = "dev1";
    else if (score2 > score1) winner = "dev2";

    const comparison = new Comparison({
      userId: req.userId, // 👈 taken from token
      dev1,
      dev2,
      winner,
    });
    await comparison.save();

    res.json({ dev1, dev2, winner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get history (protected)
router.get("/history", auth, async (req, res) => {
  try {
    const history = await Comparison.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
