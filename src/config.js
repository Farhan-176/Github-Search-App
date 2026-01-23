export const API_CONFIG = {
  BASE_URL: 'https://api.github.com',
  TIMEOUT: 5000,
  // Add your GitHub Personal Access Token here to increase rate limit from 60 to 5000/hour
  // Get one at: https://github.com/settings/tokens (no scopes needed for public data)
  TOKEN: import.meta.env.VITE_GITHUB_TOKEN || '',
}

export const REPO_CONFIG = {
  PER_PAGE: 5,
  SORT: 'created',
  DIRECTION: 'desc',
}

export const CACHE_CONFIG = {
  DURATION: 5 * 60 * 1000,
  ENABLED: true,
}

export const STORAGE_KEYS = {
  THEME: 'github-search-theme',
}

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  React: '#61dafb',
}

export const ERROR_MESSAGES = {
  EMPTY_INPUT: 'Please enter a GitHub username',
  USER_NOT_FOUND: 'User not found. Please check the username and try again.',
  RATE_LIMIT: 'GitHub API rate limit exceeded. Please try again in an hour.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
}

export const SUCCESS_MESSAGES = {
  USER_LOADED: 'Profile loaded successfully',
}
