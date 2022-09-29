import { createContext, useEffect, useState } from 'react'

import { Theme } from 'src/types'

export const ThemeContext = createContext<Theme | null>(null)

interface Props {
  initialTheme: string
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState<string>(initialTheme)

  function setInitialTheme(theme: string) {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      const isDark = theme === 'dark'
      root.classList.remove(isDark ? 'light' : 'dark')
      root.classList.add(theme)
      localStorage.setItem('color-scheme', theme)
    }
  }

  function setCurrentTheme(theme: string) {
    setTheme(theme)
  }

  useEffect(() => {
    setInitialTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{ currentTheme: theme, setCurrentTheme: setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
