import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CalendarProvider } from 'context/CalendarContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CalendarProvider>
      <Component {...pageProps} />
    </CalendarProvider>
  )
}

export default MyApp
