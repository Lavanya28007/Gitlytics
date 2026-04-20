# Gitlytics 📊

> A full-stack GitHub analytics platform that ranks and tracks 250,000+ developers across 10+ technologies — with leaderboards, head-to-head developer comparison, and real-time contribution insights.

🔗 **Live Demo:** [gitlytics-eta.vercel.app](https://gitlytics-eta.vercel.app)


## 🚀 Features

- **Developer Leaderboard** — Ranked list of top GitHub contributors by technology (React, Python, Node.js, TypeScript, Java, Vue.js, and more)
- **Head-to-Head Comparison** — Compare any two GitHub developers side-by-side on followers, repositories, and contribution impact
- **Technology Browser** — Browse top developers by language/framework; tracks growth trends (e.g. +18% TypeScript devs this month)
- **Search History** — Logged-in users can revisit previously searched developer profiles
- **Authentication** — User sign-in to unlock comparison and history features
- **Responsive Design** — Fully functional across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript (ES6+), CSS3 |
| Routing | React Router |
| API | GitHub REST API |
| Deployment | Vercel |
| Auth | JWT / Session-based (sign-in flow) |


## 🏗️ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- GitHub Personal Access Token (for API requests)

### Installation

```bash
# Clone the repository
git clone https://github.com/Lavanya28007/Gitlytics.git

# Navigate into the project
cd Gitlytics

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your GitHub token: REACT_APP_GITHUB_TOKEN=your_token_here

# Start the development server
npm start
```

App runs at `http://localhost:3000`

### Environment Variables

```env
REACT_APP_GITHUB_TOKEN=your_github_personal_access_token
```

> Generate a token at: GitHub → Settings → Developer Settings → Personal Access Tokens

---

## 📁 Project Structure

```
gitlytics/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Home, Leaderboard, Compare, About, History, Contact
│   ├── services/          # GitHub API calls
│   ├── context/           # Auth context / state management
│   └── App.js
├── .env.example
└── package.json
```

---

## 🔌 API Integration

This project consumes the **GitHub REST API v3**:

- `GET /users/{username}` — Fetch developer profile and stats
- `GET /users/{username}/repos` — Repository data and language breakdown
- `GET /search/users` — Search and filter developers by criteria

Rate limiting is handled via authenticated requests using a GitHub Personal Access Token.

---

## ✨ Key Implementation Highlights

- **Data aggregation** across 250,000+ developer profiles using paginated GitHub API calls
- **Dynamic ranking algorithm** based on followers, repository count, and contribution activity
- **Technology-based filtering** with real-time growth percentage tracking
- **Protected routes** — comparison and history features require authentication
- **Deployed on Vercel** with automatic CI/CD on push to main branch

---

## 🗺️ Roadmap

- [ ] Add repository-level analytics (stars, forks, language breakdown)
- [ ] Public developer profile pages
- [ ] Email notifications for leaderboard rank changes
- [ ] Dark mode toggle
- [ ] Export comparison results as PDF

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 👩‍💻 Author

**Lavanya Sahni**
- 🌐 Portfolio: [lavanya28007.github.io/Portfolio](https://lavanya28007.github.io/Portfolio/)
- 💼 LinkedIn: [linkedin.com/in/lavanya-sahni](https://linkedin.com/in/lavanya-sahni)
- 🐙 GitHub: [@Lavanya28007](https://github.com/Lavanya28007)

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

> Built with React.js and the GitHub API · Deployed on Vercel · Open to contributions
