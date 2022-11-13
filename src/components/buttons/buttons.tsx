import { MoonIcon, SunIcon } from '@/components/icons'
import { Theme } from 'src/types'

export const ToggleThemeButton = ({
  themeContext,
}: {
  themeContext: Theme | null
}) => {
  return (
    <button
      className="mx-4 dark:text-white"
      onClick={() =>
        themeContext?.setCurrentTheme(
          themeContext?.currentTheme === 'dark' ? 'light' : 'dark'
        )
      }
    >
      {themeContext?.currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
