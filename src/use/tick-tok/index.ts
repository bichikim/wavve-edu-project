import {useState, useEffect, useRef} from 'react'

export const useTickTok = (isRun: boolean) => {
  const [time, setTime] = useState(Date.now())
  const tickRef = useRef<any>()
  useEffect(() => {
    const loop = () => {
      setTime(Date.now())
      tickRef.current = requestAnimationFrame(loop)
    }
    if (isRun) {
      tickRef.current = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(tickRef.current)
    }
  })

  return time
}
