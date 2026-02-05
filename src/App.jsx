import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import ResultsSection from './components/ResultsSection'
import Analytics from './components/Analytics'
import RepositoryExplorer from './components/RepositoryExplorer'
import ToastContainer from './components/ToastContainer'
import { useTheme } from './hooks/useTheme'
import { useGitHubSearch } from './hooks/useGitHubSearch'
import './styles/App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const {
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
  } = useGitHubSearch()
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Math.random()
    const toast = { id, message, type }
    setToasts(prev => [...prev, toast])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const handleSearch = async (username) => {
    clearError()
    const result = await search(username)
    if (result.success) {
      showToast('Profile loaded successfully', 'success')
    } else {
      showToast(result.error, 'error')
    }
  }

  const handleInputChange = (value) => {
    getSuggestions(value)
  }

  const handleUserSelect = async (username) => {
    await handleSearch(username)
  }

  return (
    <div className="app" data-theme={theme}>
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <main className="app-container">
        <SearchSection
          onSearch={handleSearch}
          loading={loading}
          error={error}
          onErrorClose={clearError}
          suggestions={suggestions}
          searchingUsers={searchingUsers}
          onInputChange={handleInputChange}
          onSelectUser={handleUserSelect}
          onClearSuggestions={clearSuggestions}
        />
        {(user || repos.length > 0) && (
          <>
            <ResultsSection user={user} repos={repos} loading={loading} />

            {user && repos.length > 0 && (
              <>
                <Analytics username={user.login} />
                <RepositoryExplorer
                  user={user}
                  repos={repos}
                />
              </>
            )}
          </>
        )}
      </main>
      <ToastContainer toasts={toasts} />
    </div>
  )
}
