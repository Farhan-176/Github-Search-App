import React from 'react'
import { formatNumber, formatUrl } from '../utils/validators'
import './ProfileCard.css'

export default function ProfileCard({ user }) {
  const {
    avatar_url,
    login,
    name,
    bio,
    location,
    company,
    blog,
    twitter_username,
    public_repos,
    followers,
    following,
  } = user

  const renderMetaItem = (type, value, isLink = false) => {
    const icons = {
      location: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"/></svg>',
      company: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>',
      blog: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>',
      twitter: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg>',
    }

    if (isLink) {
      let url = value
      let displayText = value

      if (type === 'blog') {
        url = formatUrl(value)
        displayText = value.replace(/^https?:\/\/(www\.)?/, '')
      } else if (type === 'twitter') {
        url = `https://twitter.com/${value.replace('@', '')}`
        displayText = value
      }

      return (
        <div key={type} className="profile-meta-item">
          <div dangerouslySetInnerHTML={{ __html: icons[type] }} />
          <a href={url} target="_blank" rel="noopener noreferrer">
            {displayText}
          </a>
        </div>
      )
    } else {
      return (
        <div key={type} className="profile-meta-item">
          <div dangerouslySetInnerHTML={{ __html: icons[type] }} />
          <span>{value}</span>
        </div>
      )
    }
  }

  const metaItems = []
  if (location) metaItems.push(renderMetaItem('location', location))
  if (company) metaItems.push(renderMetaItem('company', company))
  if (blog) metaItems.push(renderMetaItem('blog', blog, true))
  if (twitter_username) metaItems.push(renderMetaItem('twitter', `@${twitter_username}`, true))

  return (
    <article className="profile-card" role="article">
      <div className="profile-header">
        <img src={avatar_url} alt={`${login}'s avatar`} className="profile-avatar" loading="lazy" />
        <div className="profile-info">
          <h2 className="profile-name">{name || login}</h2>
          <div className="profile-username">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>@{login}</span>
          </div>
          {bio && <p className="profile-bio">{bio}</p>}
          {metaItems.length > 0 && <div className="profile-meta">{metaItems}</div>}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{formatNumber(public_repos)}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(followers)}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(following)}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </article>
  )
}
