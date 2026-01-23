import { API_CONFIG, REPO_CONFIG, CACHE_CONFIG, ERROR_MESSAGES } from '../config'

const cache = new Map()

export async function fetchUser(username) {
  const cacheKey = `user-${username}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const data = await fetchWithRetry(`/users/${username}`)
    setCache(cacheKey, data)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: handleError(error) }
  }
}

export async function fetchRepos(username) {
  const cacheKey = `repos-${username}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const endpoint = `/users/${username}/repos?sort=${REPO_CONFIG.SORT}&per_page=${REPO_CONFIG.PER_PAGE}&direction=${REPO_CONFIG.DIRECTION}`
    const data = await fetchWithRetry(endpoint)
    setCache(cacheKey, data)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: handleError(error) }
  }
}

export async function searchUsers(query) {
  if (!query.trim()) return { success: true, data: [] }

  const cacheKey = `search-${query.toLowerCase()}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    // Search in name, login, bio, email
    const endpoint = `/search/users?q=${encodeURIComponent(query)}+in:name+in:login&per_page=6&sort=followers&order=desc`
    const response = await fetchWithRetry(endpoint, 1)
    
    // Fetch full user details for top 6 results to get real names (reduces API calls vs 10)
    const usersWithNames = await Promise.all(
      response.items.slice(0, 6).map(async (item) => {
        try {
          // Fetch individual user to get full name
          const userDetail = await fetchWithRetry(`/users/${item.login}`, 1)
          return {
            login: item.login,
            name: userDetail.name || item.login,
            avatar_url: item.avatar_url,
            id: item.id,
          }
        } catch {
          // Fallback to login if fetch fails
          return {
            login: item.login,
            name: item.login,
            avatar_url: item.avatar_url,
            id: item.id,
          }
        }
      })
    )

    setCache(cacheKey, usersWithNames)
    return { success: true, data: usersWithNames }
  } catch (error) {
    return { success: false, error: handleError(error), data: [] }
  }
}

// Fetch user events for activity timeline
export async function fetchUserEvents(username, perPage = 100) {
  const cacheKey = `events-${username}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const endpoint = `/users/${username}/events/public?per_page=${perPage}`
    const data = await fetchWithRetry(endpoint)
    setCache(cacheKey, data)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: handleError(error) }
  }
}

// Fetch all repos to analyze languages (for language breakdown)
export async function fetchAllReposForLanguages(username) {
  const cacheKey = `repos-languages-${username}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const endpoint = `/users/${username}/repos?per_page=100&sort=updated`
    const repos = await fetchWithRetry(endpoint)
    
    // Fetch language data for each repo
    const languagePromises = repos.map(async (repo) => {
      if (!repo.language) return null
      
      try {
        const langEndpoint = `/repos/${username}/${repo.name}/languages`
        const languages = await fetchWithRetry(langEndpoint, 1)
        return { repoName: repo.name, languages }
      } catch {
        return null
      }
    })

    const languagesData = await Promise.all(languagePromises)
    const result = { repos, languagesData: languagesData.filter(Boolean) }
    
    setCache(cacheKey, result)
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: handleError(error) }
  }
}

async function fetchWithRetry(endpoint, retries = 3) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      const headers = {
        'Accept': 'application/vnd.github.v3+json',
      }
      
      // Add token if available (increases rate limit from 60 to 5000/hour)
      if (API_CONFIG.TOKEN) {
        headers['Authorization'] = `Bearer ${API_CONFIG.TOKEN}`
      }

      const response = await fetch(url, {
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 404) throw new Error('USER_NOT_FOUND')
        if (response.status === 403) {
          const remaining = response.headers.get('X-RateLimit-Remaining')
          if (remaining === '0') throw new Error('RATE_LIMIT')
        }
        throw new Error(`HTTP_ERROR_${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (i === retries - 1 || error.message.startsWith('USER_') || error.message === 'RATE_LIMIT') {
        throw error
      }

      if (error.name === 'AbortError' && i === retries - 1) {
        throw new Error('TIMEOUT_ERROR')
      }

      await delay(Math.pow(2, i) * 1000)
    }
  }
}

function getFromCache(key) {
  const cached = cache.get(key)
  if (!cached) return null

  if (Date.now() - cached.timestamp > CACHE_CONFIG.DURATION) {
    cache.delete(key)
    return null
  }

  return cached.data
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

function handleError(error) {
  const errorMap = {
    'USER_NOT_FOUND': ERROR_MESSAGES.USER_NOT_FOUND,
    'RATE_LIMIT': ERROR_MESSAGES.RATE_LIMIT,
    'TIMEOUT_ERROR': ERROR_MESSAGES.TIMEOUT_ERROR,
  }

  return errorMap[error.message] || ERROR_MESSAGES.GENERIC_ERROR
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
