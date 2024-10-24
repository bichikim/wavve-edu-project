import {useState, useRef, useEffect} from 'react'

export interface Todo {
  id: number
  message: string
}

export interface TodoListProps {
  list: Todo[]
  doneMap: Record<string | number, boolean>
  onToggleDone: (id: number | string) => void
  onRemoveItem: (id: number | string) => void
}

export const TodoList = (props: TodoListProps) => {
  const {list, doneMap, onToggleDone, onRemoveItem} = props
  return (
    <div className="flex flex-col gap-2 w-full">
      {list.map((item) => {
        return (
          <TodoItem
            key={item.id}
            isDone={doneMap[item.id]}
            onToggleDone={onToggleDone}
            onRemoveItem={onRemoveItem}
            {...item}
          />
        )
      })}
    </div>
  )
}

export interface TodoItemProps extends Todo {
  isDone?: boolean
  onToggleDone: (id: number | string) => void
  onRemoveItem: (id: number | string) => void
}
//       <input type="checkbox" checked={isDone} onClick={() => onToggleDone(props.id)} />
export const TodoItem = (props: TodoItemProps) => {
  const {onToggleDone, isDone, message, onRemoveItem} = props
  return (
    <div
      className="w-full flex items-center bg-gray-200 rd-1 px-2 py-1"
      onClick={() => onToggleDone(props.id)}
    >
      <button className="flex-grow-1 b-0 bg-transparent flex items-center flex-shrink-1 flex-grow-1">
        <div className="color-black p-1 b-0 rd-1">{isDone ? 'V' : '-'}</div>
        <span className={`${isDone ? 'line-through' : ''} `}>{message}</span>
      </button>
      <button
        className="p-1 b-0 color-red bg-transparent h-full"
        onClick={() => onRemoveItem(props.id)}
      >
        X
      </button>
    </div>
  )
}

export interface TodoAddItemProps {
  onAddItem: (message: string) => void
}

export const TodoAddItem = (props: TodoAddItemProps) => {
  const {onAddItem} = props
  let message = ''
  const refInput = useRef<HTMLInputElement>(null)

  const handleAddItem = () => {
    onAddItem(message)
    message = ''
    if (refInput.current) {
      refInput.current.value = message
    }
  }

  const onInput = (event: any) => {
    message = event.target.value.trim()
  }

  return (
    <div className="flex gap-2 w-full">
      <input
        className="b-1 rd-1 flex-grow-1 py-2 px-2"
        placeholder="add todo"
        onChange={onInput}
        ref={refInput}
      />
      <button className="flex-shrink-0" onClick={handleAddItem}>
        add
      </button>
    </div>
  )
}

export interface LocalStorageProps {
  list: Todo[]
  doneMap: Record<string | number, boolean>
}

export const LocalStorage = (props: LocalStorageProps) => {
  const {list, doneMap} = props
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('doneMap', JSON.stringify(doneMap))
  }, [list, doneMap])
  return null
}

const getStorage = (key: string): any => {
  const value = localStorage.getItem(key)
  if (value) {
    try {
      const parsedValue = JSON.parse(value)
      if (typeof parsedValue === 'object') {
        return parsedValue as Todo[]
      }
      return
    } catch (error) {
      console.error('Failed to parse localStorage:', error)
    }
  }
  return
}

export const TodoPage = () => {
  const [list, setList] = useState(
    getStorage('list') ?? [
      {id: 1, message: 'Apple'},
      {id: 2, message: 'Banana'},
      {id: 3, message: 'Cherry'},
    ],
  )
  const idCounter = useRef(list.length)

  const [doneMap, setDoneMap] = useState<Record<string | number, boolean>>(
    getStorage('doneMap') ?? {},
  )

  const onAddItem = (message: string) => {
    idCounter.current += 1
    setList((value: any) => [...value, {id: idCounter.current, message}])
  }

  const onToggleDone = (id: string | number) => {
    setDoneMap((value) => ({...value, [id]: !value[id]}))
  }

  const onRemoveItem = (id: number | string) => {
    const index = list.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      const newList = [...list.slice(0, index), ...list.slice(index + 1)]
      setList(newList)
    }
  }

  return (
    <main className="text-purple flex flex-col gap-2 w-20rem">
      <LocalStorage list={list} doneMap={doneMap} />
      <TodoAddItem onAddItem={onAddItem} />
      <TodoList
        list={list}
        doneMap={doneMap}
        onToggleDone={onToggleDone}
        onRemoveItem={onRemoveItem}
      />
    </main>
  )
}
