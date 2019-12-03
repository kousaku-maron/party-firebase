import { firestore } from 'firebase-admin'

export const nizikai = {
  eventName: 'nizikai',
  masterMessage: '２次会に行きたい人が過半数を超えました'
}

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P]
}

export type Event = {
  isSentEventMessage?: boolean
  like?: number
  likeThreshold?: number
  name?: string
  likedUIDs?: string[]
}

export interface UpdateEvent extends Weaken<Event, 'like' | 'likedUIDs'> {
  like?: firestore.FieldValue
  likedUIDs?: firestore.FieldValue
}

export interface AfterEvent extends Weaken<Event, 'like' | 'likeThreshold'> {
  like: number
  likeThreshold: number
}

export const buildEvent = ({
  isSentEventMessage,
  like,
  likeThreshold,
  name,
  likedUIDs
}: {
  isSentEventMessage: boolean
  like: number
  likeThreshold: number
  name: string
  likedUIDs: string[]
}) => {
  const newEvent: Event = {
    isSentEventMessage,
    like,
    likeThreshold,
    name,
    likedUIDs
  }
  return newEvent
}

export const buildAfterEvent = (afterData: firestore.DocumentData) => {
  const newEvent: AfterEvent = {
    isSentEventMessage: afterData.isSentEventMessage,
    like: afterData.like,
    likeThreshold: afterData.likeThreshold,
    name: afterData.name,
    likedUIDs: afterData.likedUIDs
  }
  return newEvent
}
