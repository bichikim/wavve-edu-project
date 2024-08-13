import {RefObject, useEffect} from 'react'

export interface UseEventFunc {
  <K extends keyof HTMLElementEventMap>(
    target: RefObject<HTMLElement | null>,
    eventName: K,
    listener: (event: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  (
    target: RefObject<HTMLElement | null>,
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void
}

export const useEvent: UseEventFunc = (
  target: RefObject<HTMLElement | null>,
  eventName: string,
  listener: (...args: any) => any,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    const currentTarget = target.current
    if (currentTarget) {
      currentTarget.addEventListener(eventName, listener)
      return () => {
        currentTarget.removeEventListener(eventName, listener)
      }
    }
  }, [target.current, eventName, listener, JSON.stringify(options)])
}
