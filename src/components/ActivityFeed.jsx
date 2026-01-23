import React, { useMemo } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import './ActivityFeed.css'

export default function ActivityFeed({ events }) {
  const recentEvents = useMemo(() => {
    if (!events || events.length === 0) return []

    // Filter and format relevant events
    return events
      .filter(event => {
        // Only show meaningful event types
        return [
          'PushEvent',
          'PullRequestEvent',
          'IssuesEvent',
          'CreateEvent',
          'ForkEvent',
          'WatchEvent',
          'PublicEvent',
        ].includes(event.type)
      })
      .slice(0, 20) // Show latest 20 events
      .map(event => ({
        id: event.id,
        type: event.type,
        repo: event.repo.name,
        date: parseISO(event.created_at),
        payload: event.payload,
        ...getEventDetails(event),
      }))
  }, [events])

  function getEventDetails(event) {
    const { type, payload } = event

    switch (type) {
      case 'PushEvent':
        const commits = payload.commits?.length || 0
        return {
          icon: '📤',
          action: 'pushed',
          description: `${commits} commit${commits !== 1 ? 's' : ''}`,
          message: payload.commits?.[0]?.message,
        }

      case 'PullRequestEvent':
        return {
          icon: '🔀',
          action: payload.action,
          description: `pull request #${payload.number}`,
          message: payload.pull_request?.title,
        }

      case 'IssuesEvent':
        return {
          icon: '🐛',
          action: payload.action,
          description: `issue #${payload.issue?.number}`,
          message: payload.issue?.title,
        }

      case 'CreateEvent':
        return {
          icon: '✨',
          action: 'created',
          description: `${payload.ref_type || 'repository'}`,
          message: payload.description,
        }

      case 'ForkEvent':
        return {
          icon: '🍴',
          action: 'forked',
          description: 'repository',
          message: null,
        }

      case 'WatchEvent':
        return {
          icon: '⭐',
          action: 'starred',
          description: 'repository',
          message: null,
        }

      case 'PublicEvent':
        return {
          icon: '🌍',
          action: 'made public',
          description: 'repository',
          message: null,
        }

      default:
        return {
          icon: '📌',
          action: 'activity',
          description: '',
          message: null,
        }
    }
  }

  if (!events || events.length === 0) {
    return (
      <div className="activity-feed">
        <h3>📜 Recent Activity</h3>
        <p className="no-data">No recent public activity</p>
      </div>
    )
  }

  return (
    <div className="activity-feed">
      <h3>📜 Recent Activity</h3>
      <div className="activity-list">
        {recentEvents.map((event) => (
          <div key={event.id} className="activity-item">
            <div className="activity-icon">{event.icon}</div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-action">
                  {event.action} {event.description}
                </span>
                <span className="activity-time">
                  {formatDistanceToNow(event.date, { addSuffix: true })}
                </span>
              </div>
              <div className="activity-repo">{event.repo}</div>
              {event.message && (
                <div className="activity-message">{event.message}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
