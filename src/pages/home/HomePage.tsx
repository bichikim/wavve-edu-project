import {useState} from 'react'
import {Clock, ClockHand} from 'src/components/Clock'

export const HomePage = () => {
  const [timeValue, setTimeValue] = useState({total: 60000, start: Date.now()})

  const handleReset = () => {
    setTimeValue((state) => {
      return {...state, start: Date.now()}
    })
  }

  return (
    <main className="text-purple flex flex-col gap-2 w-20rem">
      <Clock total={timeValue.total} start={timeValue.start} className="w-300px h-300px">
        <ClockHand />
      </Clock>
      <button onClick={handleReset}>reset</button>
    </main>
  )
}
