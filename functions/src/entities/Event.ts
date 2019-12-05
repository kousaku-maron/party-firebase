import { firestore } from 'firebase-admin'
import { Reply } from 'react-native-gifted-chat'

export type ReplyType = 'positive' | 'negative'

export type EventType = 'nizikai' | 'afterParty'

export type EventReply = {
  gender: 'male' | 'female'
  replies: Reply[]
  count: number
}

export type Event = {
  isSendEventMessage: boolean
  positiveReplies: EventReply[]
  negativeReplies: EventReply[]
  threshold: number
  name: string
  repliedUIDs: string[]
}

export type UpdateEvent = {
  positiveReplies?: firestore.FieldValue
  negativeReplies?: firestore.FieldValue
  repliedUIDs?: firestore.FieldValue
  isSendEventMessage?: boolean
}

export const buildEvent = (data: firestore.DocumentData) => {
  const newEvent: Event = {
    isSendEventMessage: data.isSendEventMessage,
    positiveReplies: data.positiveReplies,
    negativeReplies: data.negativeReplies,
    threshold: data.threshold,
    name: data.name,
    repliedUIDs: data.repliedUIDs
  }
  return newEvent
}

export const eventTypeMessages = {
  nizikai: {
    activeAnswerMessage: '２次会ありな人がそれなりにいるのでどうですか？'
  },
  afterParty: {
    activeAnswerMessage: 'また集まりたい人がそれなりにいるみたいです、また集まりますか？'
  }
}
