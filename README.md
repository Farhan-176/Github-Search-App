# GitHub User Search - React Version

A professional GitHub User Search application built with **React**, **Vite**, and modern web technologies.

## ⚠️ Important: Increase API Rate Limit

GitHub limits API requests to **60 per hour** without authentication. To avoid rate limit errors:

### Get a Free GitHub Token (5 minutes):

1. **Go to:** https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `"GitHub User Search App"`
4. **DON'T select any scopes** (leave all checkboxes empty - we only read public data)
5. Click **"Generate token"** at the bottom
6. **Copy the token** (you'll only see it once!)

### Add Token to Your App:

```bash
# Create a .env file in the project root
echo VITE_GITHUB_TOKEN=your_token_here > .env

# Or manually create .env file and add:
VITE_GITHUB_TOKEN=ghp_YourTokenHere123456789
```

**Restart the dev server** after adding the token:
```bash
npm run dev
```

✅ **Result:** 60 requests/hour → **5000 requests/hour** (83x more!)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

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

## ✨ Features

- **React Hooks** - Modern state management with custom hooks
- **Component Architecture** - Modular, reusable components
- **Dark/Light Theme** - Theme persistence with localStorage
- **Professional Design** - GitHub-inspired design system
- **Responsive Layout** - Mobile-first responsive design
- **API Caching** - Smart response caching (5-minute TTL)
- **Error Handling** - Comprehensive error boundaries
- **Loading States** - Beautiful loading skeletons
- **Toast Notifications** - User feedback system
- **Accessibility** - WCAG 2.1 AA compliance

### 🤖 AI-Powered Features (NEW!)
- **📝 Profile Summary** - AI-generated professional summary of developer profiles
- **💡 Project Recommendations** - Smart project ideas based on skills and interests
- **📈 Skill Gap Analysis** - Identify missing skills and learning opportunities
- **✍️ Bio Suggestions** - Generate creative GitHub bio ideas
- **🔮 Career Path Predictions** - Predict potential career trajectories
- **🎯 Learning Recommendations** - Personalized course and resource suggestions

[Learn how to enable AI features →](./SETUP_AI_FEATURES.md)

## 🛠️ Development

### Key Technologies
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **CSS3** - Styling with custom properties
- **GitHub REST API** - Data source

### Custom Hooks
- `useTheme()` - Manage light/dark theme
- `useGitHubSearch()` - Handle API searches

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📚 Component Documentation

### Header
- Theme toggle button
- Brand logo
- Responsive navigation

### SearchSection
- GitHub username input
- Form validation
- Error display

### ProfileCard
- User avatar
- Profile stats (repos, followers, following)
- Bio and meta info (location, company, blog, twitter)

### ReposList
- Latest 5 repositories
- Language tags with colors
- Star and fork counts

## 🎨 Theming

The app uses CSS variables for theming. Dark/light mode is handled via:
- `data-theme` attribute on body
- CSS variable overrides in `[data-theme="dark"]`
- localStorage persistence

## 🔄 API Integration

### Rate Limiting
- 60 requests/hour (unauthenticated)
- Monitoring via X-RateLimit headers
- User-friendly rate limit messages

### Caching
- 5-minute cache TTL
- In-memory cache with timestamp checking
- Per-user cache keys

## 📱 Responsive Breakpoints
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

## ✅ Testing Checklist

- [ ] Search via Enter key
- [ ] Search via button click
- [ ] Empty input validation
- [ ] Valid user displays profile + repos
- [ ] Invalid user shows 404 error
- [ ] Theme toggle persists on refresh
- [ ] Loading state visible during fetch
- [ ] All null fields show fallbacks
- [ ] Rate limit message displays correctly
- [ ] Responsive on mobile/tablet/desktop

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Issues with dependencies?**
```bash
npm install --legacy-peer-deps
rm -rf node_modules package-lock.json
npm install
```

## � Future Enhancements & Roadmap

### 🎯 High-Impact Features

#### 1. Advanced Search & Filters
- **Multi-criteria search**: Filter users by location, language, follower count
- **Repository filters**: Sort by stars, language, last updated, forks
- **Advanced queries**: Support GitHub's search syntax (`followers:>100 location:Berlin`)
```javascript
// Example: GET /search/users?q=followers:>100+location:berlin
```

#### 2. User Comparison Feature
- Compare 2-3 GitHub profiles side-by-side
- Visual charts showing activity comparison
- Technology stack overlap analysis
- Collaboration recommendations

#### 3. Activity Timeline & Insights
- Contribution graph (GitHub-style heatmap)
- Recent activity feed (commits, PRs, issues)
- Language usage breakdown (pie chart)
- Productivity insights (best coding days/hours)
- Commit frequency analysis

#### 4. Favorites & History
- ⭐ Bookmark users for quick access
- 🕐 Search history with timestamps
- 📤 Export bookmarks to JSON/CSV
- 📁 Collections/folders for organizing profiles
- 🔍 Search within favorites

#### 5. Social Features
- View user's followers/following lists
- Network visualization (mutual connections graph)
- Organization membership display
- Contribution to popular repos ranking
- Developer influence score

#### 6. Repository Deep Dive
- **README preview** in modal (markdown rendered)
- **Tech stack detection** from repo files
- **Code quality metrics** (issues/commit ratio)
- **Quick clone** button with command copy
- **Stars/Forks history** graph over time
- **Contributors** list with stats
- **Recent commits** timeline

#### 7. Analytics Dashboard
- Personal stats summary card
- Language proficiency radar chart
- Contribution streaks tracker
- Pull request merge rate
- Issue resolution time
- Activity heatmap calendar
- Year-over-year comparison

#### 8. Offline Mode & PWA
```javascript
// Progressive Web App Features
- ✅ Service worker for offline caching
- 📱 Install prompt for desktop/mobile
- 🔄 Background sync for searches
- 💾 Offline-first architecture
- 🚀 Fast loading with cached assets
```

#### 9. Export & Sharing
- 🖼️ Generate shareable profile cards (PNG/PDF)
- 📊 Export data as JSON/CSV
- 📝 Copy markdown summary for README
- 🔗 Share via URL with pre-filled search
- 🎨 Customizable card templates
- 📧 Email profile summaries

#### 10. AI-Powered Features
- 🤖 Profile summary generation using LLM
- 💡 Project recommendations based on interests
- 📈 Skill gap analysis from repos
- ✍️ Auto-generated profile bio suggestions
- 🔮 Career path predictions
- 🎯 Learning recommendations

### 🔧 Technical Enhancements

#### Performance Optimizations
```javascript
// Virtual scrolling for large lists
import { FixedSizeList } from 'react-window'

// Code splitting & lazy loading
const ProfileCard = lazy(() => import('./components/ProfileCard'))

// Image optimization
<img loading="lazy" decoding="async" />

// Prefetching strategies
const prefetchSuggestions = (users) => {
  users.slice(0, 3).forEach(user => {
    fetchUser(user.login).catch(() => {})
  })
}
```

#### Advanced Caching Strategy
```javascript
// IndexedDB for persistent caching
import { openDB } from 'idb'

// Multi-level cache (memory → localStorage → IndexedDB)
// Cache invalidation strategies
// Background cache updates
```

#### Real-time Updates
```javascript
// WebSocket for live follower count
// Polling for active profiles
setInterval(() => refreshActiveProfile(), 60000)

// Server-Sent Events for notifications
// Live activity feed updates
```

### 🎨 UX Enhancements

- ⌨️ **Keyboard shortcuts** (`Ctrl+K` for search, `Ctrl+D` for theme, `Esc` to clear)
- 🎯 **Command palette** (⌘+P style interface)
- 🖱️ **Drag & drop** to compare profiles
- ♾️ **Infinite scroll** for repositories
- 🔍 **Spotlight search** with fuzzy matching
- 🎉 **Confetti animation** on milestones (>10k followers)
- 💀 **Advanced skeleton screens** for all loading states
- ♿ **Enhanced accessibility** (screen reader announcements, focus trap in modals)
- 🎭 **Micro-interactions** (button ripples, smooth transitions)
- 📱 **Swipe gestures** on mobile
- 🌈 **Theme customization** (not just dark/light, but custom colors)
- 🔔 **Browser notifications** for saved searches

### 📊 Data Visualization

```javascript
// Recommended libraries
import { Chart as ChartJS } from 'chart.js'
import { ResponsiveContainer, LineChart } from 'recharts'
import * as d3 from 'd3' // For network graphs
```

**Charts to Implement:**
- 📈 Contribution activity heatmap
- 🥧 Language distribution pie chart
- 📊 Star growth over time (line chart)
- 📉 Repository size comparison (bar chart)
- 🕸️ Developer network graph (force-directed)
- ⏱️ Commit frequency by time of day
- 🌍 Geographic contributions map

### 🔐 OAuth Integration

```javascript
// GitHub OAuth for authenticated users
const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID

// Benefits:
- ✅ 5000 requests/hour (vs 60 unauthenticated)
- 🔒 Access private repos (with user permission)
- ⭐ Star/unstar repositories directly from app
- 👥 Follow/unfollow users
- 🔔 Manage notifications
- 📝 Edit gists
```

### 🌟 Gamification

- 🏆 "GitHub Explorer" achievements system
- 🎯 Profile discovery challenges
- 💎 Rare profiles collection (palindrome IDs, early adopters)
- 📅 Daily discovery suggestions
- 🔥 Streak tracking for daily searches
- 🎖️ Badges for milestones
- 📊 Leaderboard for most searches

### 🚀 Quick Wins (Priority Implementation)

**Estimated Time:**
1. ✅ **Search history** (localStorage) - 30 minutes
2. ✅ **README preview modal** - 1-2 hours
3. ✅ **Copy to clipboard** buttons - 20 minutes
4. ✅ **Keyboard shortcuts** - 1 hour
5. ✅ **Language breakdown chart** - 2 hours
6. ✅ **PWA manifest** - 30 minutes
7. ✅ **Infinite scroll for repos** - 1 hour
8. ✅ **User comparison (basic)** - 3 hours
9. ✅ **Export to JSON/CSV** - 1 hour
10. ✅ **Favorites system** - 2 hours

### 📦 Recommended Libraries

```json
{
  "chart.js": "^4.4.0",           // Chart creation
  "react-chartjs-2": "^5.2.0",    // React wrapper for Chart.js
  "react-window": "^1.8.10",      // Virtual scrolling
  "react-markdown": "^9.0.0",     // README rendering
  "remark-gfm": "^4.0.0",         // GitHub Flavored Markdown
  "idb": "^8.0.0",                // IndexedDB wrapper
  "react-hot-toast": "^2.4.1",    // Enhanced toast notifications
  "framer-motion": "^11.0.0",     // Advanced animations
  "zustand": "^4.5.0",            // Lightweight state management
  "react-query": "^5.0.0",        // Server state management
  "date-fns": "^3.0.0",           // Date utilities
  "react-icons": "^5.0.0",        // Icon library
  "recharts": "^2.10.0",          // React charting library
  "html2canvas": "^1.4.0",        // Screenshot generation
  "jspdf": "^2.5.0",              // PDF generation
  "fuse.js": "^7.0.0",            // Fuzzy search
  "react-confetti": "^6.1.0",     // Celebration animations
  "workbox-webpack-plugin": "^7.0.0"  // PWA service worker
}
```

### 🤝 Contributing

Want to implement any of these features? Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

### 📊 Feature Voting

Vote for which features you'd like to see implemented first by opening an issue with the "feature-request" label!

## �📄 License

MIT
