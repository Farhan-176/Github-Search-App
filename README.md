# GitHub User Search

> A modern, responsive GitHub user search application built with React and Vite.

## 🌟 Features

- 🔍 Search GitHub users by username
- 👤 View detailed user profiles with stats
- 📚 Browse user repositories with language tags
- 📊 Visualize language distribution with interactive charts
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Fast and optimized with Vite

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will open at `http://localhost:5173`

### 🔑 Increase API Rate Limit (Recommended)

GitHub limits unauthenticated requests to **60/hour**. Get a free token for **5000/hour**:

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. **Don't select any scopes** (public data only)
4. Copy the token
5. Create `.env` file:
   ```bash
   VITE_GITHUB_TOKEN=your_token_here
   ```
6. Restart the dev server

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server  
- **Chart.js** - Data visualization
- **CSS3** - Modern styling with custom properties
- **GitHub REST API** - Data source

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── SearchSection.jsx
│   ├── ResultsSection.jsx
│   ├── ProfileCard.jsx
│   ├── ReposList.jsx
│   ├── Loader.jsx
│   └── ToastContainer.jsx
├── hooks/              # Custom React hooks
│   ├── useTheme.js     # Theme management
│   └── useGitHubSearch.js  # API search logic
├── services/           # API services
│   └── api.js          # GitHub API integration
├── utils/              # Utility functions
│   └── validators.js   # Input validation
├── styles/             # CSS styles
│   ├── variables.css   # Design tokens
│   ├── base.css        # Base styles
│   ├── components.css  # Component styles
│   ├── layout.css      # Layout & responsive
│   └── index.css       # Global styles
├── App.jsx             # Main app component
├── config.js           # Configuration
└── main.jsx            # Entry point
```

## 🎨 Theme Support

Toggle between dark and light themes with persistent settings stored in localStorage.

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Dependency issues?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT
