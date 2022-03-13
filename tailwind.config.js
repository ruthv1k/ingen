module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-background': '#f0f3ff',
        'light-theme-primary': '#3F3CBB',
        'dark-background': '#1c1c27',
        'dark-theme-primary': '#2c2d4a',
        'dark-theme-heading': '#FFFFFF',
        'dark-theme-body': '#8193b2',
      },
    },
  },
  plugins: [],
}
