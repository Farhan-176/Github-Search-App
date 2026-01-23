import { useState, useEffect } from 'react'
import { STORAGE_KEYS, THEME } from '../config'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME)
      return saved || THEME.LIGHT
    } catch {
      return THEME.LIGHT
    }
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)
  }

  return { theme, toggleTheme }
}
