import {PropsWithChildren} from 'react'

export type AppProps = PropsWithChildren<{
  // empty
}>

export const App = (props: AppProps) => {
  return <>{props.children}</>
}
