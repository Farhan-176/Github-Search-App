import React, { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '../hooks/useTheme'
import './LanguageChart.css'

ChartJS.register(ArcElement, Tooltip, Legend)

// GitHub language colors (subset - can be expanded)
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  R: '#198CE7',
  Lua: '#000080',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  'Objective-C': '#438eff'
}

const getRandomColor = () => {
  const colors = ['#0366d6', '#28a745', '#ffd33d', '#f66a0a', '#6f42c1', '#d73a49']
  return colors[Math.floor(Math.random() * colors.length)]
}

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export default function LanguageChart({ languagesData }) {
  // Get theme from hook to ensure re-renders on theme change
  const { theme } = useTheme()
  const isDarkTheme = theme === 'dark'

  console.log('LanguageChart received:', languagesData)

  const chartData = useMemo(() => {
    if (!languagesData || languagesData.length === 0) {
      return null
    }

    // Aggregate language bytes across all repos
    const languageTotals = {}

    languagesData.forEach(({ languages }) => {
      Object.entries(languages).forEach(([lang, bytes]) => {
        languageTotals[lang] = (languageTotals[lang] || 0) + bytes
      })
    })

    // Convert to array and sort by bytes
    const sortedLanguages = Object.entries(languageTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10) // Top 10 languages

    if (sortedLanguages.length === 0) return null

    const labels = sortedLanguages.map(([lang]) => lang)
    const data = sortedLanguages.map(([, bytes]) => bytes)
    const backgroundColor = sortedLanguages.map(([lang]) =>
      LANGUAGE_COLORS[lang] || getRandomColor()
    )

    return {
      labels,
      datasets: [
        {
          label: 'Bytes of Code',
          data,
          backgroundColor,
          borderColor: isDarkTheme ? '#0d1117' : '#ffffff',
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    }
  }, [languagesData, isDarkTheme])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDarkTheme ? '#ffffff' : '#24292e',
          padding: 15,
          font: {
            size: 13,
            weight: '600',
          },
          generateLabels: (chart) => {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              const total = data.datasets[0].data.reduce((a, b) => a + b, 0)

              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i]
                const percentage = ((value / total) * 100).toFixed(1)

                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  textDecoration: undefined,
                  hidden: false,
                  index: i,
                }
              })
            }
            return []
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkTheme ? '#21262d' : '#e1e4e8',
        titleColor: isDarkTheme ? '#ffffff' : '#24292e',
        bodyColor: isDarkTheme ? '#ffffff' : '#24292e',
        borderColor: isDarkTheme ? '#30363d' : '#d1d5da',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = context.parsed
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            const bytes = formatBytes(value)
            return `${label}: ${bytes} (${percentage}%)`
          },
        },
      },
    },
  }

  if (!chartData) {
    return (
      <div className="language-chart">
        <h3>🗣️ Language Distribution</h3>
        <p className="no-data">No language data available</p>
      </div>
    )
  }

  return (
    <div className="language-chart">
      <h3>🗣️ Language Distribution</h3>
      <div className="chart-container">
        <Doughnut key={theme} data={chartData} options={options} />
      </div>
    </div>
  )
}
