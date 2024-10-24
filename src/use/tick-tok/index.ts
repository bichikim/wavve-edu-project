import {useState, useEffect, useRef} from 'react'

export const useTickTok = (updateTime = 500) => {
  const [time, setTime] = useState(0)
  const tickRef = useRef<any>()
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTime(Date.now())
    }, updateTime)
    return () => {
      clearInterval(tickRef.current)
    }
  }, [updateTime])

  return time
}
