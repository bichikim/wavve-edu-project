import {describe, it} from 'vitest'

describe('one', () => {
  it('should be result', () => {
    const a = 10
    const b = 5
    let result = a * b
    result += 10
    const isGreater = result > 50

    console.log(isGreater)
  })

  it('should be result', () => {
    const numbers = [1, 2, 3, 4, 5]
    let total = 0

    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i]
    }

    const average = total / numbers.length

    console.log(average)
  })
  it('should be result', () => {
    const items = ['apple', 'banana', 'orange']
    const searchItem = 'banana'
    let found = false

    for (let i = 0; i < items.length; i++) {
      if (items[i] === searchItem) {
        found = true
        break
      }
    }

    console.log(found)
  })
  it('should be result', () => {
    const numbers = [10, 20, 30, 40, 50]
    let sum = 0

    for (const number of numbers) {
      sum += number
    }

    console.log(sum)
  })
  it('should be result', () => {
    const word = 'hello'
    let reversedWord = ''

    for (const char of word) {
      reversedWord = char + reversedWord
    }

    console.log(reversedWord)
  })
  it('should be result', () => {
    let counter = 0
    const max = 5

    do {
      console.log(counter)
      counter++
    } while (counter < max)
  })
})
