export const API_CONFIG = {
  BASE_URL: 'https://api.github.com',
  TIMEOUT: 5000,
  // Add your GitHub Personal Access Token here to increase rate limit from 60 to 5000/hour
  // Get one at: https://github.com/settings/tokens (no scopes needed for public data)
  TOKEN: import.meta.env.VITE_GITHUB_TOKEN || '',
}

export const AI_CONFIG = {
  // OpenAI API configuration
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_BASE_URL: 'https://api.openai.com/v1',
  MODEL: 'gpt-3.5-turbo', // or 'gpt-4' for better results
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,

  // Alternative: Use Anthropic Claude
  ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  ANTHROPIC_MODEL: 'claude-3-haiku-20240307',

  // Alternative: Use Google Gemini Pro
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_MODEL: 'gemini-1.5-pro-latest', // Latest stable model for v1 API

  // Provider priority (first available will be used)
  PROVIDER_PRIORITY: ['gemini', 'openai', 'anthropic'],

  // Feature flags
  ENABLED: import.meta.env.VITE_AI_ENABLED === 'true',
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
