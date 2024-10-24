import {useTickTok} from 'src/use/tick-tok'

export const HomePage = () => {
  const time = useTickTok()
  return <main className="text-purple flex flex-col gap-2 w-20rem">{time}</main>
}
