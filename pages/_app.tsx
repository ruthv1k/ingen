import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CalendarProvider } from 'context/CalendarContext'
import ThemeProvider from 'context/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider initialTheme="light">
      <CalendarProvider>
        <Component {...pageProps} />
      </CalendarProvider>
    </ThemeProvider>
  )
}

export default MyApp
