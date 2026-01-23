import React, { useState, useRef, useEffect } from 'react'
import SearchDropdown from './SearchDropdown'
import './SearchSection.css'

export default function SearchSection({ onSearch, loading, error, onErrorClose, suggestions, onInputChange, searchingUsers, onSelectUser, onClearSuggestions }) {
  const [input, setInput] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false)
        onClearSuggestions()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClearSuggestions])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
      setDropdownOpen(false)
      onClearSuggestions()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    setDropdownOpen(true)
    onInputChange(value)
  }

  const handleUserSelect = (username) => {
    setInput(username)
    setDropdownOpen(false)
    onSelectUser(username)
    onClearSuggestions()
  }

  return (
    <section className="search-section" role="search">
      <div className="search-container">
        <h2 className="search-title">Discover GitHub Developers</h2>
        <p className="search-subtitle">Search for any GitHub user to explore their profile, stats, and repositories</p>

        <form className="search-form" onSubmit={handleSubmit} ref={searchRef}>
          <div className="search-controls">
            <div className="search-input-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Enter GitHub username (e.g., octocat)"
                value={input}
                onChange={handleInputChange}
                disabled={loading}
                autoFocus
                spellCheck="false"
                aria-label="GitHub username"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="search-button" disabled={loading}>
              <span className="button-text">Search</span>
              <svg className="button-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </button>
          </div>
          
          <SearchDropdown
            suggestions={suggestions}
            onSelectUser={handleUserSelect}
            isOpen={dropdownOpen}
            isLoading={searchingUsers}
          />

          {error && (
            <div className="error-message show" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
