import { firestore } from 'firebase-admin'

export type Event = {
  decrement?: number
  increment?: number
  isSentEventMessage?: boolean
  like?: number | firestore.FieldValue
  likeThreshold?: number
  name?: string
  likedUid?: string[] | firestore.FieldValue
}

export const nizikai = {
  eventName: 'nizikai',
  masterMessage: '２次会に行きたい人が過半数を超えました'
}

export const buildEvent = ({
  decrement,
  increment,
  isSentEventMessage,
  like,
  likeThreshold,
  name,
  likedUid
}: {
  decrement: number
  increment: number
  isSentEventMessage: boolean
  like: number
  likeThreshold: number
  name: string
  likedUid: string[]
}) => {
  const newEvent = {
    decrement,
    increment,
    isSentEventMessage,
    like,
    likeThreshold,
    name,
    likedUid
  }
  return newEvent
}
