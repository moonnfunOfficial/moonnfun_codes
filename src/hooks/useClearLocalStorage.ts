import { useEffect } from 'react'

export function useClearLocalStorageOnUnload(key: string, enabled = true, delay = 300) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let cleared = false

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') { 
        timeoutId = setTimeout(() => {
          if (!cleared) {
            localStorage.removeItem(key)
            cleared = true
          }
        }, delay)
      } else if (document.visibilityState === 'visible') { 
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [key, enabled, delay])
}
