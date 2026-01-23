import React, { useMemo } from 'react'
import { format, subDays, parseISO, startOfDay, getDay, startOfWeek, addDays, getMonth } from 'date-fns'
import './ContributionHeatmap.css'

const getContributionLevel = (count) => {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 10) return 3
  return 4
}

export default function ContributionHeatmap({ events }) {
  const { contributionData, monthLabels } = useMemo(() => {
    if (!events || events.length === 0) return { contributionData: [], monthLabels: [] }

    const days = 365
    const today = new Date()
    const startDate = subDays(today, days - 1)

    // Start from the first Sunday before or on the start date
    const firstDay = startOfWeek(startDate, { weekStartsOn: 0 })
    const contributions = new Map()

    // Initialize all days with 0 contributions
    for (let i = 0; i < days; i++) {
      const date = format(startOfDay(subDays(today, i)), 'yyyy-MM-dd')
      contributions.set(date, 0)
    }

    // Count contributions per day (commits from PushEvents)
    events.forEach(event => {
      const eventDate = format(startOfDay(parseISO(event.created_at)), 'yyyy-MM-dd')
      if (contributions.has(eventDate)) {
        // Count actual commits for PushEvents, 1 for other contribution events
        let contributionCount = 1

        if (event.type === 'PushEvent') {
          // Count the number of commits in the push
          contributionCount = event.payload?.size || event.payload?.commits?.length || 1
        } else if (event.type === 'PullRequestEvent' ||
          event.type === 'IssuesEvent' ||
          event.type === 'PullRequestReviewEvent') {
          contributionCount = 1
        } else {
          // Don't count other event types as contributions
          contributionCount = 0
        }

        contributions.set(eventDate, contributions.get(eventDate) + contributionCount)
      }
    })

    // Build weeks array properly aligned to Sunday-Saturday
    const weeks = []
    const monthLabels = []
    let currentDate = firstDay

    // Calculate total number of weeks needed
    const totalDays = Math.ceil((today.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const totalWeeks = Math.ceil(totalDays / 7)

    for (let w = 0; w < totalWeeks; w++) {
      const week = []

      for (let d = 0; d < 7; d++) {
        const dateStr = format(currentDate, 'yyyy-MM-dd')
        const count = contributions.get(dateStr) || 0

        week.push({
          date: dateStr,
          count: count,
          level: getContributionLevel(count),
          dayOfWeek: getDay(currentDate)
        })

        // Track month changes for labels
        if (d === 0 && (w === 0 || getMonth(currentDate) !== getMonth(subDays(currentDate, 7)))) {
          monthLabels.push({
            weekIndex: w,
            label: format(currentDate, 'MMM')
          })
        }

        currentDate = addDays(currentDate, 1)
      }

      weeks.push(week)
    }

    return { contributionData: weeks, monthLabels }
  }, [events])

  const totalContributions = useMemo(() => {
    return contributionData.flat().reduce((sum, day) => sum + day.count, 0)
  }, [contributionData])

  const maxStreak = useMemo(() => {
    const allDays = contributionData.flat()
    let currentStreak = 0
    let maxStreak = 0

    allDays.forEach(day => {
      if (day.count > 0) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    })

    return maxStreak
  }, [contributionData])

  if (!events || events.length === 0) {
    return (
      <div className="contribution-heatmap">
        <h3>📊 Contribution Activity</h3>
        <p className="no-data">No public activity in the last year</p>
      </div>
    )
  }

  return (
    <div className="contribution-heatmap">
      <div className="heatmap-header">
        <h3>📊 Contribution Activity</h3>
        <div className="heatmap-stats">
          <span className="stat">
            <strong>{totalContributions}</strong> contributions in the last year
          </span>
          <span className="stat">
            <strong>{maxStreak}</strong> day streak
          </span>
        </div>
      </div>

      <div className="heatmap-note">
        <small>
          ℹ️ Based on recent public events. May not reflect all contributions shown on GitHub profile.
        </small>
      </div>

      <div className="heatmap-container">
        <div className="heatmap-wrapper">
          {/* Month labels */}
          <div className="heatmap-months">
            {monthLabels.map((month, idx) => (
              <div
                key={idx}
                className="month-label"
                style={{ gridColumn: month.weekIndex + 2 }}
              >
                {month.label}
              </div>
            ))}
          </div>

          {/* Day labels and grid */}
          <div className="heatmap-content">
            {/* Day labels */}
            <div className="heatmap-days">
              <div className="day-label" style={{ gridRow: 2 }}>Mon</div>
              <div className="day-label" style={{ gridRow: 4 }}>Wed</div>
              <div className="day-label" style={{ gridRow: 6 }}>Fri</div>
            </div>

            {/* Contribution grid */}
            <div className="heatmap-grid">
              {contributionData.map((week, weekIndex) => (
                <div key={weekIndex} className="heatmap-week">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`heatmap-day level-${day.level}`}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      data-count={day.count}
                      data-date={day.date}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="heatmap-legend">
          <span className="legend-label">Less</span>
          <div className="legend-day level-0" />
          <div className="legend-day level-1" />
          <div className="legend-day level-2" />
          <div className="legend-day level-3" />
          <div className="legend-day level-4" />
          <span className="legend-label">More</span>
        </div>
      </div>
    </div>
  )
}
