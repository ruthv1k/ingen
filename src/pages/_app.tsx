import type { AppProps } from 'next/app'
import ThemeProvider from 'src/context/ThemeContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider initialTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
