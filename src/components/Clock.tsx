import {
  createContext,
  PropsWithChildren,
  ReactNode,
  SVGProps,
  useContext,
  HTMLProps,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import {useTickTok} from 'src/use/tick-tok'

export type ClockProps = PropsWithChildren & {
  total?: number
  start?: number
  isStart?: boolean
} & HTMLProps<HTMLDivElement>

export interface ClockContextValue {
  progress?: number
}

export const ClockContext = createContext<ClockContextValue>({})

export const Clock = (props: ClockProps) => {
  const {total = 60000, isStart, start = Date.now(), ...rest} = props
  const startTime = useRef<number>(start)
  const time = useTickTok(Boolean(isStart))
  const _start = useMemo(() => {
    if (isStart) {
      return Date.now()
    }
    return startTime.current
  }, [isStart, start])

  const current = time - _start
  const progress = current / total
  const progressFact = progress > 1 ? 1 : progress

  useEffect(() => {
    if (isStart) {
      startTime.current = current
    }
  }, [current, isStart])

  return (
    <div {...rest}>
      <ClockContext.Provider value={{progress: progressFact}}>
        {props.children}
      </ClockContext.Provider>
    </div>
  )
}

export type ClockHandSvgProps = Omit<
  SVGProps<SVGSVGElement>,
  'width' | 'height' | 'viewBox' | 'radius'
>

export type ClockHandProps = {
  progress?: number
  radius?: number
  startDegree?: number
  children?: ReactNode | undefined
} & ClockHandSvgProps

export const ClockHand = (props: ClockHandProps) => {
  const clockContext = useContext(ClockContext)
  const {
    radius = 25,
    progress = clockContext.progress ?? 0,
    startDegree = 0,
    ...restProps
  } = props

  const rotate = -90 + startDegree

  const circumference = 2 * Math.PI * radius

  const dashoffset = circumference * progress

  return (
    <svg {...restProps} width="100%" height="100%" viewBox="0 0 100 100">
      {props.children}
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

export type ClockHandBackgroundProps = ClockHandSvgProps & PropsWithChildren

export const ClockHandBackground = (props: ClockHandBackgroundProps) => {
  return (
    <ClockHand {...props} progress={1}>
      {props.children}
    </ClockHand>
  )
}
