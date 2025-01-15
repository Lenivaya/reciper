import { isBrowser } from 'browser-or-node'

export function initializeAuthState() {
  if (!isBrowser) return { token: null }
  const token = localStorage.getItem('auth:token')
  return { token }
}

export function logout() {
  localStorage.removeItem('auth:token')
  window.location.reload()
  return { token: null }
}
