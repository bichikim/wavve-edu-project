import {useCallback, useRef, useState, useEffect} from 'react'
import {useEvent} from 'src/use/event/index'
import {useImmer} from 'use-immer'

/**
 * use event 사용 예시
 */
export const UseEvent = () => {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLButtonElement | null>(null)

  const [state, setState] = useImmer({count: 0})

  const increment = useCallback(() => {
    setCount((value) => value + 1)
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  useEvent(elementRef, 'click', increment)

  const onClick = useCallback(() => {
    setState((draft) => {
      draft.count = 0
    })
  }, [])

  return (
    <>
      <button className="text-green" ref={elementRef}>
        Click Me {count}
      </button>
      <button className="text-green" onClick={onClick}>
        hello
      </button>
    </>
  )
}
