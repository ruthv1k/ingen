import { useCallback, useEffect, useState } from 'react'

interface PopupData {
  isOpen: boolean
  date: string
}

interface Props {
  popup: PopupData
  openPopup: (date: PopupData['date']) => void
  closePopup: () => void
}

const initialState = {
  isOpen: false,
  date: '',
}

export const usePopup = (): Props => {
  const [popup, setPopup] = useState(initialState)

  const openPopup = useCallback(
    (date: PopupData['date']) => setPopup(() => ({ isOpen: true, date: date })),
    []
  )

  const closePopup = useCallback(() => setPopup(initialState), [])

  const handleKeydown = (e: { key: string; keyCode: number }) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closePopup()
    }
  }

  useEffect(() => {
    if (popup.isOpen) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      return window.removeEventListener('keydown', handleKeydown)
    }
  }, [popup.isOpen])

  return { popup, openPopup, closePopup }
}
