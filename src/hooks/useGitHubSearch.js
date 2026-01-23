import { useState, useRef } from 'react'
import { validateUsername } from '../utils/validators'
import { fetchUser, fetchRepos, searchUsers } from '../services/api'

export function useGitHubSearch() {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [searchingUsers, setSearchingUsers] = useState(false)
  const debounceTimer = useRef(null)

  const search = async (username) => {
    const validation = validateUsername(username)

    if (!validation.valid) {
      setError(validation.error)
      return { success: false, error: validation.error }
    }

    setError(null)
    setLoading(true)

    try {
      const [userResult, reposResult] = await Promise.all([
        fetchUser(validation.value),
        fetchRepos(validation.value),
      ])

      if (!userResult.success) {
        setError(userResult.error)
        return { success: false, error: userResult.error }
      }

      setUser(userResult.data)
      setRepos(reposResult.success ? reposResult.data : [])

      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'An error occurred'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  const getSuggestions = (query) => {
    // Clear previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (!query.trim()) {
      setSuggestions([])
      setSearchingUsers(false)
      return
    }

    setSearchingUsers(true)

    // Debounce search for 150ms for faster response
    debounceTimer.current = setTimeout(async () => {
      const result = await searchUsers(query)
      if (result.success) {
        setSuggestions(result.data)
      } else {
        setSuggestions([])
      }
      setSearchingUsers(false)
    }, 150)
  }

  const clearSuggestions = () => {
    setSuggestions([])
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
  }

  return {
    user,
    repos,
    loading,
    error,
    suggestions,
    searchingUsers,
    search,
    clearError,
    getSuggestions,
    clearSuggestions,
  }
}
