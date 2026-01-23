import React, { useState, useEffect } from 'react'
import ContributionHeatmap from './ContributionHeatmap'
import LanguageChart from './LanguageChart'
import ActivityFeed from './ActivityFeed'
import ProductivityInsights from './ProductivityInsights'
import Loader from './Loader'
import { fetchUserEvents, fetchAllReposForLanguages } from '../services/api'
import './Analytics.css'

export default function Analytics({ username }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const [languagesData, setLanguagesData] = useState([])

  useEffect(() => {
    if (!username) return

    const loadAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch events and language data in parallel
        const [eventsResult, languagesResult] = await Promise.all([
          fetchUserEvents(username),
          fetchAllReposForLanguages(username),
        ])

        console.log('Events result:', eventsResult)
        console.log('Languages result:', languagesResult)

        if (!eventsResult.success) {
          throw new Error(eventsResult.error)
        }

        setEvents(eventsResult.data || [])
        setLanguagesData(languagesResult.success ? languagesResult.data.languagesData : [])
      } catch (err) {
        console.error('Analytics error:', err)
        setError(err.message || 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [username])

  if (loading) {
    return (
      <div className="analytics">
        <div className="analytics-header">
          <h2>📊 Activity Timeline & Insights</h2>
        </div>
        <div className="analytics-loading">
          <Loader />
          <p>Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics">
        <div className="analytics-header">
          <h2>📊 Activity Timeline & Insights</h2>
        </div>
        <div className="analytics-error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    )
  }

  if (events.length === 0 && languagesData.length === 0) {
    return (
      <div className="analytics">
        <div className="analytics-header">
          <h2>📊 Activity Timeline & Insights</h2>
        </div>
        <div className="analytics-empty">
          <p>No public activity data available for this user.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>📊 Activity Timeline & Insights</h2>
        <p className="analytics-subtitle">
          Analyzing {events.length} recent events and {languagesData.length} repositories
        </p>
      </div>

      <div className="analytics-grid">
        {/* Contribution Heatmap - Full Width */}
        <div className="analytics-section full-width">
          <ContributionHeatmap events={events} />
        </div>

        {/* Language Chart and Activity Feed - Side by Side */}
        <div className="analytics-section">
          <LanguageChart languagesData={languagesData} />
        </div>

        <div className="analytics-section">
          <ActivityFeed events={events} />
        </div>

        {/* Productivity Insights - Full Width */}
        <div className="analytics-section full-width">
          <ProductivityInsights events={events} />
        </div>
      </div>
    </div>
  )
}
