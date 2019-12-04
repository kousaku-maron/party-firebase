import { firestore } from 'firebase-admin'
import { Reply } from 'react-native-gifted-chat'

export type EventTypes = 'nizikai' | 'afterParty'

export const EventTypeMessages = {
  nizikai: {
    activeAanswerMessage: '２次会に行きたい人が過半数を超えました'
  },
  afterParty: {
    activeAanswerMessage: 'イベントが発生しました'
  }
}

export type EventReply = {
  gender: 'male' | 'female'
  replies: Reply[]
  count: number
}

export type Event = {
  isSentEventMessage?: boolean
  positiveReplies: EventReply[]
  negativeReplies: EventReply[]
  threshold: number
  name?: string
  repliedUIDs: string[]
}

export type UpdateEvent = {
  positiveReplies?: firestore.FieldValue
  negativeReplies?: firestore.FieldValue
  repliedUIDs?: firestore.FieldValue
  isSentEventMessage?: boolean
}

export const buildEvent = (data: firestore.DocumentData) => {
  const newEvent: Event = {
    isSentEventMessage: data.isSentEventMessage,
    positiveReplies: data.positiveReplies,
    negativeReplies: data.negativeReplies,
    threshold: data.threshold,
    name: data.name,
    repliedUIDs: data.repliedUIDs
  }
  return newEvent
}
