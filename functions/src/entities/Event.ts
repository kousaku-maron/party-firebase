export type Event = {
  decrement: number
  increment: number
  isSentEventMessage: boolean
  like: number
  likeThreshold: number
  name: string
}

export const buildEvent = ({
    decrement,
    increment,
    isSentEventMessage,
    like,
    likeThreshold,
    name
  }: {
    decrement: number
    increment: number
    isSentEventMessage: boolean
    like: number
    likeThreshold: number
    name: string
  }) => {
  const newEvent = {
    decrement,
    increment,
    isSentEventMessage,
    like,
    likeThreshold,
    name

  }
  return newEvent
}
