import {useState} from 'react'

export const Calculating = () => {
  const value1 = 10
  const value2 = 40
  const [method, setMethod] = useState('빼기')

  // addition subtraction

  const setAddition = () => {
    setMethod('빼기')
  }

  const setSubtraction = () => {
    setMethod('더하기')
  }

  const result = method === '더하기' ? value1 + value2 : value1 - value2

  return (
    <main className="text-purple">
      <span>
        {value1} {method} {value2} = {result}
      </span>
      <br />
      <button onClick={setAddition}>+</button>
      <button onClick={setSubtraction}>-</button>
    </main>
  )
}
