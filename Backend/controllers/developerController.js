const axios = require('axios'); 
const constants = require('../constants'); 
// Helper: GitHub request with headers
 const githubRequest = (url) => 
  axios.get(url, { 
    headers: { 
        'User-Agent': constants.user_agent,
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
    });
// Get developers by location & language (with optional filters)
const getDevelopers = async (req, res) => {
  try {
    const { location, language, per_page = 10, page = 1 } = req.query;

    // Build dynamic query
    let query = [];
    if (location) query.push(`location:${location}`);
    if (language) query.push(`language:${language}`);

    // Fallback: if no filters, just search "type:user" for global developers
    const searchQuery = query.length > 0 ? query.join('+') : 'type:user';

    const response = await githubRequest(
      `${constants.base_url}/search/users?q=${searchQuery}&per_page=${per_page}&page=${page}`
    );
    
    // Clean up response
    const developers = response.data.items.map((dev) => ({
      username: dev.login,
      avatar: dev.avatar_url,
      profile_url: dev.html_url,
      score: dev.score,
    }));

    res.json({
      total_count: response.data.total_count,
      incomplete_results: response.data.incomplete_results,
      developers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.error_message });
  }
};
// Get detailed profile with repos, followers, and top languages 
const getDeveloperProfile = async (req, res) => { 
  try {
     const { username } = req.params; 

// Fetch profile, repos, and followers in parallel 
const [profileRes, reposRes, followersRes] = await Promise.all([
   githubRequest(`${constants.base_url}/users/${username}`), 
   githubRequest(`${constants.base_url}/users/${username}/repos?per_page=100`), 
   githubRequest(`${constants.base_url}/users/${username}/followers`), 
]); 
const profile = profileRes.data; 
const repos = reposRes.data;
const followers = followersRes.data;

 // Calculate top languages 
 const languageCount = {}; 
 repos.forEach((repo) => { 
  if (repo.language) { 
    languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
   }
   });
    const topLanguages = Object.entries(languageCount)
     .sort((a, b) => b[1] - a[1])  // sort by usage count
      .map(([lang, count]) => ({ language: lang, count })); 



      // Final response object 
      res.json({ profile, followers_count: followers.length,
        top_languages: topLanguages,
         repos: repos.map((repo) => ({ 
          name: repo.name, 
          stars: repo.stargazers_count, 
          forks: repo.forks_count, 
          language: repo.language, 
        })), 
      }); 
    } catch (error) { 
      console.error(error.message);
       res.status(500).json({ message: constants.error_message }); 
      } 
    };
module.exports = { getDevelopers, getDeveloperProfile };
