export interface Theme {
  currentTheme: string
  setCurrentTheme: (theme: string) => void
}

export interface Task {
  id: string
  title: string
  description: string
  tag: string
  date: string
  fromTime: string
  toTime: string
  isDone: boolean
}
