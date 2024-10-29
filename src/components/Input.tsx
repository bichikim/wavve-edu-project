import {InputHTMLAttributes, useEffect, useMemo, useRef, ChangeEventHandler} from 'react'
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (value: string) => void
}

export const HandyInput = (props: InputProps) => {
  const {value, onChange, onValueChange, ...restProps} = props
  const inputElement = useRef<HTMLInputElement | null>(null)
  const [attrs, eventHandlers] = useMemo(() => {
    const _props: any = restProps
    const keys = Object.keys(_props)
    const attrs: Record<string, any> = {}
    const events: Record<string, any> = {}

    for (const key of keys) {
      if (/^on[A-Z]/.test(key)) {
        events[key] = _props[key]
      } else {
        attrs[key] = _props[key]
      }
    }
    return [attrs, events]
  }, [restProps])

  useEffect(() => {
    const input = inputElement.current
    if (!input) {
      return
    }

    if (typeof value === 'string' || typeof value === 'number') {
      input.value = String(value)
    }
  }, [value])

  useEffect(() => {
    const input = inputElement.current
    if (!input) {
      return
    }

    for (const key of Object.keys(attrs)) {
      input.setAttribute(key, attrs[key])
    }
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onValueChange?.(event.target.value)
    onChange?.(event)
  }

  return <input {...eventHandlers} ref={inputElement} onChange={handleChange} />
}
