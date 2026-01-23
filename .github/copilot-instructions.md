# GitHub Copilot Instructions

## Project Overview
Enterprise-grade GitHub User Search Application built with full-stack engineering principles. Features real-time user search, comprehensive profile analytics, repository insights, and professional UI/UX with theme customization.

## Tech Stack & Architecture

**Frontend Layer:**
- Vanilla JavaScript (ES6+ modules, async/await, Promise handling)
- HTML5 (semantic markup, accessibility-first)
- CSS3 (Grid/Flexbox, custom properties, animations, responsive)

**API Layer:**
- GitHub REST API v3 (rate limiting, caching strategy)
- Fetch API with retry logic and error boundaries
- Request queue management for API optimization

**Staervice Layer Pattern
Separate concerns into dedicated services:

**GitHubAPIService** (`services/github-api.js`):
```javascript
class GitHubAPIService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.cache = new Map();
    this.rateLimitRemaining = null;
  }
  
  async fetchUser(username) { /* with caching & retry */ }
  async fetchRepos(username, options) { /* pagination ready */ }
  checkRateLimit() { /* inspect X-RateLimit headers */ }
}
```

**StorageService** (`services/storage.js`):
```javascript
class StorageService {
  get(key, defaultValue) { /* with JSON parse error handling */ }
  set(key, value) { /* with JSON stringify */ }
  remove(key) { /* with existence check */ }
}
```

### State Management Pattern
Use centralized state with observer pattern:
```javascript
const AppState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
  theme: 'light',
  observers: [],
  
  setState(updates) {
    Object.assign(this, updates);
    this.notify();
  },
  
  subscribe(callback) {
    this.observers.push(callback);
  }
};
```

### Component Architecture
Each UI component is a pure function returning DOM elements:
```javascript
// components/profile.js
export function createProfileCard(userData) {
  const card = document.createElement('article');
  card.className = 'profile-card';
  // Build component with proper null handling
  return card;
}
```
│   │   ├── github-api.js    # API client with retry/cache
│   │   └── storage.js       # LocalStorage wrapper
│   ├── utils/
│   │   ├── validators.js    # Input validation
│   │   └── dom.js          # DOM manipulation helpers
│   ├── components/
│   │   ├── profile.js       # Profile rendering logic
│   │   ├── repos.js         # Repository list rendering
│   │   └── loader.js        # Loading state component
│   └── app.js           # Main application controller
└── assets/
    └── icons/           # SVG icons for UI
```

## Core Architecture Patterns

### State Management
Global state variables in `main.js`:
```javascript
let currentUser = null;      // Stores fetched user data
let isLoading = false;       // Loading state flag
let Professional Design System

**Design Tokens** (`css/variables.css`):
```css
:root {
  /* Color Palette - Light Theme */
  --color-primary: #0366d6;
  --color-primary-hover: #0256c2;
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f6f8fa;
  --color-bg-tertiary: #e1e4e8;
  --color-text-primary: #24292e;
  --color-text-secondary: #586069;
  --color-border: #d1d5da;
  --color-success: #28a745;
  --color-error: #d73a49;
  
  /* Typography Scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  
  /* Spacing Scale (8px base) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  
  /* Elevation (shadows) */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
  
  /* Animation */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-tertiary: #21262d;
  --color-text-primary: #c9d1d9;
  --color-text-secondary: #8b949e;
  --color-border: #30363d;
  /* Override light values */
}
```

**Component Design Patterns:**
- Card components with `box-shadow` for depth
- Micro-interactions (hover states, focus rings)
- Loading skeletons (not just spinners)
- Smooth transitions between states
- Responsive typography (clamp for fluid scaling)TTP Status Handling:**
- `200` → Success, render data
- `404` → User not found error
- `403` → Rate limit exceeded (60/hour unauthenticated)
- Network errors → Generic connection error

**Fetch Pattern:**
```javascript
const response = await fetch(url);
if (!response.ok) {
  if (response.status === 404) { /* user not found */ }
  if (response.status === 403) { /* rate limit */ }
}
const data = await response.json();
```

### Null/Missing Data Handling
**CRITICAL:** GitHub API returns `null` for optional fields. Always provide fallbacks:
- Name → `data.name || data.login`
- Bio → `data.bio || "No bio available"`
- Location/Company/Blog/Twitter → `"Not Available"` if null
- Repo description → `"No description provided"` if null

Never render empty/undefined values to the DOM.

### Theme System
Use CSS variables in `:root` and `[data-theme="dark"]`:
```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --accent-color: #0366d6;
}
[data-theme="dark"] {
  --bg-color: #0d1117;
  --text-color: #c9d1d9;
  /* ... */
}
```
Local Development
```bash
# Option 1: Python (recommended for CORS handling)
python -m http.server 8000

# Option 2: Node.js
npx serve -p 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Access at: `http://localhost:8000`

### Production Build Preparation
Even without a build tool, optimize for production:
1. Minify CSS/JS (use online tools or add build step)
2. Optimize images (compress SVGs, use WebP)
3. Add `<meta>` tags for SEO
4. Enable caching headers (if deploying to server)
5. Professional Code Standards

### JavaScript Patterns
```javascript
// ✅ Use ES6+ features
const { login, avatar_url, bio } = userData;
const repos = data?.repositories ?? [];

// ✅ Async/await with proper error handling
tryProduction-Ready Checklist

### Must-Have Features
✅ **API Optimization:**
- Response caching (5-minute TTL)
- Request debouncing (300ms)
- Rate limit monitoring from headers
- Retry logic with exponential backoff

✅ **UI/UX Excellence:**
- Loading skeletons (not just spinners)
- Empty states with actionable messages
- Micro-interactions (button ripples, smooth transitions)
- Toast notifications for errors
- Keyboard shortcuts (e.g., `/` to focus search)

✅ **Performance:**
- Lazy-load images with placeholder
- Debounce search input
- Virtual scrolling for large repo lists (future enhancement)
- CSS/JS minification for production

✅ **Security:**
- Sanitize user inputs (XSS prevention)
- Use `textContent` over `innerHTML` where possible
- CSP headers (if hosting on server)

### Common Pitfalls to Avoid

❌ **Data Handling:**
- Not handling null/undefined API fields
- Mutating state directly (use immutable patterns)
- Forgetting to clear previous data

❌ **UI State:**
- Console-only errors (users must see feedback)
- Not re-enabling inputs after errors
- Missing loading indicators
- No feedback on successful actions

❌ **Performance:**
- Making redundant API calls
- Not caching responses
- Blocking main thread with heavy operations
- Layout thrashing from repeated DOM reads/writes

❌ **Accessibility:**
- Missing ARIA labels
- Poor keyboard navigation
- Low color contrast
- No focus indicators

---

## Advanced Enhancements (Optional)

**Debounce Search:**
```javascript
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

**Request Caching:**
```javascript
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
```

**Intersection Observer for Lazy Loading:**
```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
```

---

**Production-ready means:** Enterprise-level error handling, optimized performance, accessible to all users, and delightful UX with professional design
/**
 * Fetches user data with retry logic
 * @param {string} username - GitHub username
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} User data
 */
```

### CSS Best Practices
```css
/* ✅ BEM naming convention */
.profile-card { }
.profile-card__header { }
.profile-card__header--highlighted { }

/* ✅ Mobile-first media queries */
.container {
  width: 100%;
  padding: var(--space-2);
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* ✅ CSS Grid for layouts */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-2);
}
```

### HTML Semantic Structure
```html
<!-- ✅ Proper semantic tags -->
<main class="app-container">
  <header class="app-header">
    <h1>GitHub User Search</h1>
    <nav><button aria-label="Toggle theme"></button></nav>
  </header>
  
  <section class="search-section" role="search">
    <form class="search-form">...</form>
  </section>
  
  <article class="profile-card" role="article">...</article>
</main>
```

### Error Handling Strategy
```javascript
// Centralized error handler
function handleAPIError(error) {
  if (error.status === 404) {
    showError('User not found. Try another username.');
  } else if (error.status === 403) {
    showError('API rate limit exceeded. Try again in an hour.');
  } else if (!navigator.onLine) {
    showError('No internet connection. Check your network.');
  } else {
    showError('Something went wrong. Please try again.');
    console.error('API Error:', error);
  }
}
```
- [ ] Invalid username shows 404 error
- [ ] Rate limit shows helpful message
- [ ] Network errors handled gracefully
- [ ] Theme persists across sessions
- [ ] All null API fields have fallbacks

**Performance:**
- [ ] Initial load < 1s (on fast connection)
- [ ] API responses cached appropriately
- [ ] No layout shifts during loading
- [ ] Smooth animations (60fps)
- [ ] Images lazy-loaded if applicable

**Accessibility (WCAG 2.1 AA):**
- [ ] Keyboard navigation works completely
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Screen reader announces state changes

**Responsive Design:**
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px+)
- [ ] Touch targets ≥ 44x44px on mobile

### Browser DevTools Checks
```javascript
// Performance audit
Lighthouse → Performance score ≥ 90

// Console clean
No errors, warnings, or uncaught promises

// Network tab
API calls optimized, no redundant requests
```
3. Display user-friendly error message (centered, visible)
4. Log detailed error to console for debugging
5. Re-enable UI inputs

### First Load
1. Check `localStorage.getItem('github-search-theme')`
2. Apply saved theme or default to 'light'
3. Set `data-theme` attribute on body
4. Update toggle UI to match

## Validation & Edge Cases

- **Empty search:** Show inline error, prevent API call
- **Whitespace-only input:** Trim and validate
- **Duplicate requests:** Clear old content before new search
- **Slow network:** Loading spinner must be visible
- **API rate limit:** Display clear message about limit (60/hour)
- **Previous search data:** Always clear before new search

## Development Workflow

### Running Locally
No build step required. Open `index.html` directly in browser or use:
```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server installed)
npx http-server
```

### Testing Checklist
- [ ] Search via Enter key works
- [ ] Search via button click works
- [ ] Empty input shows error
- [ ] Valid user displays profile + repos
- [ ] Invalid user shows 404 error
- [ ] Theme toggle persists on refresh
- [ ] Loading state visible during fetch
- [ ] All null fields show fallback text

## Code Quality Standards

- Use `async/await` for all API calls (no raw promises)
- No inline styles - all styling in `style.css`
- Use semantic HTML (`<main>`, `<section>`, `<article>`)
- Mobile-first responsive design
- Accessibility: proper ARIA labels, keyboard navigation
- Clean separation: HTML structure, CSS presentation, JS behavior

## Common Pitfalls to Avoid

❌ Not handling null API fields → broken UI
❌ Not clearing old content before new search
❌ Console-only errors (users can't see them)
❌ Forgetting to re-enable inputs after error
❌ Not persisting theme preference
❌ Missing loading state feedback

---
**Production-ready means:** Zero placeholders, complete error handling, graceful fallbacks, and polished UX.
