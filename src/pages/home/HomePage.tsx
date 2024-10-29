import {useState} from 'react'
import {Clock, ClockHand, ClockHandBackground} from 'src/components/Clock'
import {HandyInput} from 'src/components/Input'

export const HomePage = () => {
  const [timeValue, setTimeValue] = useState({
    total: 60000,
    start: Date.now(),
    isStart: false,
  })

  const handleReset = () => {
    setTimeValue((state) => {
      return {...state, start: Date.now()}
    })
  }

  const handleChangeTotal = (value: string) => {
    setTimeValue((state) => {
      return {...state, total: parseInt(value, 10)}
    })
  }

  const hadnleToggleStart = () => {
    setTimeValue((state) => {
      return {
        ...state,
        isStart: !state.isStart,
      }
    })
  }

  return (
    <main className="flex flex-col gap-2 w-20rem">
      <Clock
        total={timeValue.total}
        start={timeValue.start}
        isStart={timeValue.isStart}
        className="w-300px h-300px relative"
      >
        <ClockHandBackground className="color-red absolute top-0 left-0 drop-shadow-lg" />
        <ClockHand className="absolute color-white top-0 left-0" />
        <ClockHandBackground className="color-white absolute top-50% left-50% w-20% h-20% translate--50% drop-shadow-md" />
      </Clock>
      <button onClick={handleReset}>reset</button>
      <HandyInput value={timeValue.total} onValueChange={handleChangeTotal} />
      <button onClick={hadnleToggleStart}>{timeValue.isStart ? 'stop' : 'start'}</button>
    </main>
  )
}
