import {useCallback, useRef, useState} from 'react'
import {useEvent} from 'src/use/event/index'

export const UseEvent = () => {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLButtonElement | null>(null)

  const increment = useCallback(() => {
    setCount((value) => value + 1)
  }, [])

  useEvent(elementRef, 'click', increment)

  return (
    <button className="text-green" ref={elementRef}>
      Click Me {count}
    </button>
  )
}
