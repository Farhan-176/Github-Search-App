import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { parseISO, getHours, getDay, format } from 'date-fns'
import './ProductivityInsights.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ProductivityInsights({ events }) {
  // Get theme from document
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark'
  
  const insights = useMemo(() => {
    if (!events || events.length === 0) return null

    // Analyze commit events only
    const pushEvents = events.filter(e => e.type === 'PushEvent')

    if (pushEvents.length === 0) return null

    // Count by day of week
    const byDay = [0, 0, 0, 0, 0, 0, 0] // Sun-Sat
    // Count by hour
    const byHour = Array(24).fill(0)

    pushEvents.forEach(event => {
      const date = parseISO(event.created_at)
      const day = getDay(date)
      const hour = getHours(date)
      
      const commits = event.payload.commits?.length || 1
      byDay[day] += commits
      byHour[hour] += commits
    })

    // Find peak times
    const peakDay = byDay.indexOf(Math.max(...byDay))
    const peakHour = byHour.indexOf(Math.max(...byHour))

    // Calculate total commits
    const totalCommits = pushEvents.reduce(
      (sum, e) => sum + (e.payload.commits?.length || 1),
      0
    )

    return {
      byDay,
      byHour,
      peakDay,
      peakHour,
      totalCommits,
      totalPushEvents: pushEvents.length,
    }
  }, [events])

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const dayChartData = useMemo(() => {
    if (!insights) return null

    return {
      labels: dayNames,
      datasets: [
        {
          label: 'Commits by Day',
          data: insights.byDay,
          backgroundColor: 'rgba(3, 102, 214, 0.7)',
          borderColor: 'rgba(3, 102, 214, 1)',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }
  }, [insights])

  const hourChartData = useMemo(() => {
    if (!insights) return null

    return {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Commits by Hour',
          data: insights.byHour,
          backgroundColor: 'rgba(40, 167, 69, 0.7)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }
  }, [insights])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkTheme ? '#21262d' : '#e1e4e8',
        titleColor: isDarkTheme ? '#c9d1d9' : '#24292e',
        bodyColor: isDarkTheme ? '#c9d1d9' : '#24292e',
        borderColor: isDarkTheme ? '#30363d' : '#d1d5da',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkTheme ? '#8b949e' : '#586069',
          precision: 0,
        },
        grid: {
          color: isDarkTheme ? '#30363d' : '#d1d5da',
        },
      },
      x: {
        ticks: {
          color: isDarkTheme ? '#8b949e' : '#586069',
        },
        grid: {
          display: false,
        },
      },
    },
  }

  if (!insights || !dayChartData || !hourChartData) {
    return (
      <div className="productivity-insights">
        <h3>⏰ Productivity Insights</h3>
        <p className="no-data">Not enough commit activity to analyze</p>
      </div>
    )
  }

  return (
    <div className="productivity-insights">
      <h3>⏰ Productivity Insights</h3>

      <div className="insights-stats">
        <div className="stat-card">
          <div className="stat-value">{insights.totalCommits}</div>
          <div className="stat-label">Total Commits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dayNames[insights.peakDay]}</div>
          <div className="stat-label">Most Active Day</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {format(new Date().setHours(insights.peakHour, 0), 'h:mm a')}
          </div>
          <div className="stat-label">Peak Hour</div>
        </div>
      </div>

      {/* Mobile Text View */}
      <div className="insights-text">
        <div className="text-insight">
          <p><strong>Day of Week Distribution:</strong></p>
          <ul>
            {dayNames.map((day, idx) => (
              insights.byDay[idx] > 0 && (
                <li key={idx}>{day}: <strong>{insights.byDay[idx]} commits</strong></li>
              )
            ))}
          </ul>
        </div>

        <div className="text-insight">
          <p><strong>Peak Hours:</strong></p>
          <ul>
            {insights.byHour
              .map((commits, hour) => ({ hour, commits }))
              .filter(item => item.commits > 0)
              .sort((a, b) => b.commits - a.commits)
              .slice(0, 5)
              .map((item, idx) => (
                <li key={idx}>{item.hour}:00 - {item.commits} commits</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Desktop Chart View */}
      <div className="charts-grid">
        <div className="chart-section">
          <div className="chart-header">
            <h4>📅 Commits by Day of Week</h4>
          </div>
          <div className="chart-wrapper">
            <Bar data={dayChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <h4>🕐 Commits by Hour of Day</h4>
          </div>
          <div className="chart-wrapper">
            <Bar data={hourChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
