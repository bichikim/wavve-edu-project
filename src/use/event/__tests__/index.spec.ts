/**
 * @vitest-environment jsdom
 */
import {useEvent} from '../'
import {describe, it, expect, vi} from 'vitest'
import {renderHook, act} from '@testing-library/react'
import {useRef} from 'react'

describe('useEvent', () => {
  it('should emit events', () => {
    const element = document.createElement('div')

    const callback = vi.fn()

    const {unmount} = renderHook(() => {
      const elementRef = useRef(element)
      useEvent(elementRef, 'click', callback)
    })

    act(() => {
      element.dispatchEvent(new Event('click'))
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      element.dispatchEvent(new Event('click'))
    })

    expect(callback).toHaveBeenCalledTimes(2)

    unmount()

    act(() => {
      element.dispatchEvent(new Event('click'))
    })

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
