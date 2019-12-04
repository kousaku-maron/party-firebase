import { firestore } from 'firebase-admin'

export const nizikai = {
  eventName: 'nizikai',
  masterMessage: '２次会に行きたい人が過半数を超えました'
}

export type Event = {
  isSentEventMessage?: boolean
  like: number
  likeThreshold: number
  name?: string
  likedUIDs: string[]
}

export interface UpdateEvent extends Omit<Event, 'like' | 'likedUIDs' | 'likeThreshold'> {
  like?: firestore.FieldValue
  likedUIDs?: firestore.FieldValue
  likeThreshold?: number
}

export const buildEvent = (data: firestore.DocumentData) => {
  const newEvent: Event = {
    isSentEventMessage: data.isSentEventMessage,
    like: data.like,
    likeThreshold: data.likeThreshold,
    name: data.name,
    likedUIDs: data.likedUIDs
  }
  return newEvent
}
