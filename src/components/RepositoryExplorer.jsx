import React, { useState, useEffect } from 'react'
import '../styles/RepositoryExplorer.css'

export default function RepositoryExplorer({ user, repos }) {
    const [activeTab, setActiveTab] = useState('comparison')
    const [stats, setStats] = useState(null)

    useEffect(() => {
        if (repos && repos.length > 0) {
            calculateStats()
        }
    }, [repos])

    const calculateStats = () => {
        // Calculate repository statistics
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
        const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
        const totalWatchers = repos.reduce((sum, repo) => sum + (repo.watchers_count || 0), 0)
        const totalIssues = repos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0)

        // Get language distribution
        const languages = {}
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1
            }
        })

        // Get topics
        const topics = {}
        repos.forEach(repo => {
            if (repo.topics && Array.isArray(repo.topics)) {
                repo.topics.forEach(topic => {
                    topics[topic] = (topics[topic] || 0) + 1
                })
            }
        })

        // Sort repos by different metrics
        const mostStarred = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5)
        const mostForked = [...repos].sort((a, b) => b.forks_count - a.forks_count).slice(0, 5)
        const mostRecent = [...repos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
        const mostUpdated = [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 5)

        setStats({
            totalStars,
            totalForks,
            totalWatchers,
            totalIssues,
            languages: Object.entries(languages).sort((a, b) => b[1] - a[1]),
            topics: Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 10),
            mostStarred,
            mostForked,
            mostRecent,
            mostUpdated,
            avgStars: (totalStars / repos.length).toFixed(1),
            avgForks: (totalForks / repos.length).toFixed(1),
        })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    if (!stats) {
        return (
            <div className="repo-explorer">
                <div className="repo-explorer-loading">
                    <p>Analyzing repositories...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="repo-explorer">
            <div className="repo-explorer-header">
                <h2>📊 Repository Explorer</h2>
                <p>Deep dive into repository statistics and insights</p>
            </div>

            <div className="repo-explorer-tabs">
                <button
                    className={`repo-tab ${activeTab === 'comparison' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comparison')}
                >
                    📈 Comparison
                </button>
                <button
                    className={`repo-tab ${activeTab === 'topics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('topics')}
                >
                    🏷️ Topics
                </button>
                <button
                    className={`repo-tab ${activeTab === 'timeline' ? 'active' : ''}`}
                    onClick={() => setActiveTab('timeline')}
                >
                    ⏱️ Timeline
                </button>
                <button
                    className={`repo-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    🎯 Overview
                </button>
            </div>

            <div className="repo-explorer-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="repo-section">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">⭐</div>
                                <div className="stat-info">
                                    <h3>{stats.totalStars.toLocaleString()}</h3>
                                    <p>Total Stars</p>
                                    <span className="stat-avg">Avg: {stats.avgStars}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🔱</div>
                                <div className="stat-info">
                                    <h3>{stats.totalForks.toLocaleString()}</h3>
                                    <p>Total Forks</p>
                                    <span className="stat-avg">Avg: {stats.avgForks}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👁️</div>
                                <div className="stat-info">
                                    <h3>{stats.totalWatchers.toLocaleString()}</h3>
                                    <p>Total Watchers</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🐛</div>
                                <div className="stat-info">
                                    <h3>{stats.totalIssues.toLocaleString()}</h3>
                                    <p>Open Issues</p>
                                </div>
                            </div>
                        </div>

                        <div className="languages-section">
                            <h3>💻 Language Distribution</h3>
                            <div className="languages-list">
                                {stats.languages.map(([lang, count], idx) => (
                                    <div key={idx} className="language-item">
                                        <span className="language-name">{lang}</span>
                                        <div className="language-bar-container">
                                            <div
                                                className="language-bar"
                                                style={{ width: `${(count / repos.length) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="language-count">{count} repos</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparison Tab */}
                {activeTab === 'comparison' && (
                    <div className="repo-section">
                        <div className="comparison-grid">
                            <div className="comparison-card">
                                <h3>⭐ Most Starred</h3>
                                <div className="repo-list">
                                    {stats.mostStarred.map((repo, idx) => (
                                        <div key={idx} className="repo-item">
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                {repo.name}
                                            </a>
                                            <span className="repo-metric">{repo.stargazers_count} ⭐</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="comparison-card">
                                <h3>🔱 Most Forked</h3>
                                <div className="repo-list">
                                    {stats.mostForked.map((repo, idx) => (
                                        <div key={idx} className="repo-item">
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                {repo.name}
                                            </a>
                                            <span className="repo-metric">{repo.forks_count} 🔱</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Topics Tab */}
                {activeTab === 'topics' && (
                    <div className="repo-section">
                        <h3>🏷️ Popular Topics</h3>
                        {stats.topics.length > 0 ? (
                            <div className="topics-cloud">
                                {stats.topics.map(([topic, count], idx) => (
                                    <div
                                        key={idx}
                                        className="topic-tag"
                                        style={{ fontSize: `${0.9 + (count / stats.topics[0][1]) * 0.6}rem` }}
                                    >
                                        {topic}
                                        <span className="topic-count">{count}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-data">No topics found in repositories</p>
                        )}
                    </div>
                )}

                {/* Timeline Tab */}
                {activeTab === 'timeline' && (
                    <div className="repo-section">
                        <div className="timeline-grid">
                            <div className="timeline-card">
                                <h3>🆕 Most Recent</h3>
                                <div className="repo-list">
                                    {stats.mostRecent.map((repo, idx) => (
                                        <div key={idx} className="repo-item">
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                {repo.name}
                                            </a>
                                            <span className="repo-date">{formatDate(repo.created_at)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="timeline-card">
                                <h3>🔄 Recently Updated</h3>
                                <div className="repo-list">
                                    {stats.mostUpdated.map((repo, idx) => (
                                        <div key={idx} className="repo-item">
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                {repo.name}
                                            </a>
                                            <span className="repo-date">{formatDate(repo.updated_at)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
