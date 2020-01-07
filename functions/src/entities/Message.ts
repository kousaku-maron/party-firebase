import { firestore } from 'firebase-admin'

// same gifted-chat Reply type
type Reply = {
  title: string
  value: string
  messageId?: any
}

// same gifted-chat QuickRreplies type
type QuickReplies = {
  type: 'radio' | 'checkbox'
  values: Reply[]
  keepIt?: boolean
}

// same origin User type
type User = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
  gender?: string
}

export type Message = {
  text: string
  createdAt: Date
  imageURL?: string
  videoURL?: string
  user?: User
  writerUID?: string
  system: boolean
  quickReplies?: QuickReplies
  notified: boolean
}

export const buildMessage = (data: firestore.DocumentData) => {
  const newMessage: Message = {
    text: data.text,
    createdAt: data.createdAt.toDate(),
    imageURL: data.imageURL,
    videoURL: data.videoURL,
    user: data.user,
    writerUID: data.writerUID,
    system: data.system,
    quickReplies: data.quickReplies,
    notified: data.notified
  }
  return newMessage
}

export type CreateMessage = Pick<
  Message,
  'text' | 'user' | 'writerUID' | 'system' | 'quickReplies' | 'imageURL' | 'videoURL' | 'notified'
>

export type UpdateMessage = Pick<Message, 'notified'>
