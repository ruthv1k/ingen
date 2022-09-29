export default function getInitialTheme(): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-scheme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return 'dark'
    }
  }

  return 'light'
}
