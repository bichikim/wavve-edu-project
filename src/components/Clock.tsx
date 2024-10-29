import {useTickTok} from 'src/use/tick-tok'
import {createContext, useContext, PropsWithChildren} from 'react'

export interface ClockProps extends PropsWithChildren {
  total?: number
  start?: number
  className?: string
}

export interface ClockContextValue {
  progress?: number
}

export const ClockContext = createContext<ClockContextValue>({})

export const Clock = (props: ClockProps) => {
  const time = useTickTok()
  const {total = 60000, start = Date.now(), ...rest} = props
  const current = time - start
  const progress = current / total
  const progressFact = progress > 1 ? 1 : progress
  return (
    <div {...rest}>
      <ClockContext.Provider value={{progress: progressFact}}>
        {props.children}
      </ClockContext.Provider>
    </div>
  )
}

export interface ClockHandProps {
  progress?: number
  radius?: number
  startDegree?: number
}

export const ClockHand = (props: ClockHandProps) => {
  const clockContext = useContext(ClockContext)
  const {radius = 25, progress = clockContext.progress ?? 0, startDegree = 0} = props

  const rotate = -90 + startDegree

  const circumference = 2 * Math.PI * radius

  const dashoffset = circumference * progress

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={radius * 2}
        strokeDasharray={`${dashoffset} ${circumference}`}
        transform={`rotate(${rotate})`}
        transform-origin="50% 50%"
      />
    </svg>
  )
}
