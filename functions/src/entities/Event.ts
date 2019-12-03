import { firestore } from 'firebase-admin'

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P]
}

export type Event = {
  isSentEventMessage?: boolean
  like?: number
  likeThreshold?: number
  name?: string
  likedUids?: string[]
}

export interface UpdateEvent extends Weaken<Event, 'like' | 'likedUids'> {
  like?: firestore.FieldValue
  likedUids?: firestore.FieldValue
}

export const nizikai = {
  eventName: 'nizikai',
  masterMessage: '２次会に行きたい人が過半数を超えました'
}

export const buildEvent = ({
  isSentEventMessage,
  like,
  likeThreshold,
  name,
  likedUid
}: {
  isSentEventMessage: boolean
  like: number
  likeThreshold: number
  name: string
  likedUid: string[]
}) => {
  const newEvent = {
    isSentEventMessage,
    like,
    likeThreshold,
    name,
    likedUid
  }
  return newEvent
}
