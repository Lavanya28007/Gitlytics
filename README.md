# Gitlytics 📊

> A full-stack GitHub analytics platform that ranks and tracks 250,000+ developers across 10+ technologies — with leaderboards, head-to-head developer comparison, and real-time contribution insights.

🔗 **Live Demo:** [gitlytics-eta.vercel.app](https://gitlytics-eta.vercel.app)

---

## 🚀 Features

- **Developer Leaderboard** — Ranked list of top GitHub contributors by technology (React, Python, Node.js, TypeScript, Java, Vue.js, and more)
- **Head-to-Head Comparison** — Compare any two GitHub developers side-by-side on followers, repositories, and contribution impact
- **Technology Browser** — Browse top developers by language/framework; tracks growth trends (e.g. +18% TypeScript devs this month)
- **Search History** — Logged-in users can revisit previously searched developer profiles
- **Authentication** — User sign-in to unlock comparison and history features
- **Responsive Design** — Fully functional across mobile, tablet, and desktop
- **Developer Profile Pages** — Dedicated pages per developer with stats and repository breakdown
- **Repository-level Analytics** — Stars, forks, and language breakdown per repo

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| API | GitHub REST API |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + Middleware |
| Deployment | Vercel |

---

## 📁 Project Structure

```
gitlytics/
├── Backend/
│   ├── controllers/
│   │   └── developerController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── ComparisonModel.js
│   │   └── UserModel.js
│   ├── routers/
│   │   ├── ComparisonRouter.js
│   │   ├── DeveloperRouter.js
│   │   └── UserRouter.js
│   ├── connection.js
│   ├── constants.js
│   └── index.js
│
└── frontend/
    └── src/app/
        ├── aboutus/
        ├── browse/
        ├── compare/
        ├── components/
        ├── contactus/
        ├── developer/
        ├── history/
        ├── leaderboard/
        ├── login/
        ├── signup/
        ├── utils/
        │   ├── api.js
        │   └── techMap.js
        ├── layout.jsx
        └── page.jsx
```

---

## 🏗️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- GitHub Personal Access Token (for API requests)
- MongoDB (local or Atlas)

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_personal_access_token
PORT=5000
```

```bash
node index.js
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
```

```bash
npm run dev
```

App runs at `http://localhost:3000`

> Generate a GitHub token at: GitHub → Settings → Developer Settings → Personal Access Tokens

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
- **Protected routes** — comparison and history features require authentication via JWT middleware
- **Comparison history** saved to MongoDB per user via `ComparisonModel`
- **Deployed on Vercel** with automatic CI/CD on push to main branch

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

> Built with Next.js and the GitHub API · Deployed on Vercel · Open to contributions
