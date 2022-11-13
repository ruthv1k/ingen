import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import { ThemeContext } from 'src/context/ThemeContext'
import { ToggleThemeButton } from '../buttons'

const Header = () => {
  const themeContext = useContext(ThemeContext)

  // Routes stuff
  const router = useRouter()
  const currentRoute = router.pathname
  const routes = {
    Home: '/',
    Tasks: '/tasks',
  }

  return (
    <header className="mx-auto mb-6 flex w-11/12 items-center justify-between py-6 md:max-w-screen-md">
      <h3 className="font-bold dark:text-white">Ingen.</h3>
      <nav className="flex items-center justify-start">
        {Object.entries(routes).map((route, i) => (
          <Link href={route[1]} key={i}>
            <a className="mx-4 text-sm dark:text-white/80">{route[0]}</a>
          </Link>
        ))}
        <ToggleThemeButton themeContext={themeContext} />
      </nav>
    </header>
  )
}

export default Header
