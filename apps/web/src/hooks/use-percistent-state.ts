import { useCallback, useState } from 'react'

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return defaultValue
  })

  const setPersistentState = useCallback(
    (value: T) => {
      setState(value)
      localStorage.setItem(key, JSON.stringify(value))
    },
    [key],
  )

  return [state, setPersistentState]
}
