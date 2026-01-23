import React from 'react'
import './SearchDropdown.css'

export default function SearchDropdown({ suggestions, onSelectUser, isOpen, isLoading }) {
  if (!isOpen || (!suggestions.length && !isLoading)) {
    return null
  }

  return (
    <div className="search-dropdown">
      {isLoading ? (
        <div className="dropdown-loading">
          <span className="loading-spinner"></span>
          <span>Searching...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="suggestions-list">
          {suggestions.map(user => (
            <li key={user.id} className="suggestion-item">
              <button
                className="suggestion-button"
                onClick={() => onSelectUser(user.login)}
                type="button"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="suggestion-avatar"
                />
                <div className="suggestion-info">
                  <span className="suggestion-name">{user.name}</span>
                  <span className="suggestion-login">@{user.login}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="dropdown-no-results">
          <span>No users found</span>
        </div>
      )}
    </div>
  )
}
