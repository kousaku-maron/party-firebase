import { firestore } from 'firebase-admin'

// react-native-gifted-chat type
export type GiftedChatReply = {
  title: string
  value: string
  messageId?: any
}

export type ReplyType = 'positive' | 'negative'

export type EventType = 'nizikai' | 'afterParty'

export type EventReply = {
  gender: 'male' | 'female'
  replies: GiftedChatReply[]
  count: number
}

export type Event = {
  isSendEventMessage: boolean
  positiveReplies: EventReply[]
  negativeReplies: EventReply[]
  maleThreshold: number
  femaleThreshold: number
  name: EventType
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
    maleThreshold: data.maleThreshold,
    femaleThreshold: data.femaleThreshold,
    name: data.name,
    repliedUIDs: data.repliedUIDs
  }
  return newEvent
}

export const eventTypeMessages = {
  nizikai: {
    activeAnswerMessage: 'この後どうする？'
  },
  afterParty: {
    activeAnswerMessage: 'また集まりたい人がそれなりにいるみたいです、また集まりますか？'
  }
}
