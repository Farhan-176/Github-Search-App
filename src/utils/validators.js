import { ERROR_MESSAGES } from '../config'

export function validateUsername(username) {
  const trimmed = username.trim()

  if (!trimmed) {
    return {
      valid: false,
      error: ERROR_MESSAGES.EMPTY_INPUT,
    }
  }

  // Allow any text for searching (names can have spaces, special chars)
  // GitHub Search API will handle the query
  return {
    valid: true,
    error: null,
    value: trimmed,
  }
}

export function formatUrl(url) {
  if (!url) return ''
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '0'
  return num.toLocaleString()
}
