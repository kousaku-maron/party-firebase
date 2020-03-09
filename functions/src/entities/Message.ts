import { firestore } from 'firebase-admin'
import { User } from './User'

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

export type Message = {
  id: string
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

export const buildMessage = (id: string, data: firestore.DocumentData) => {
  const newMessage: Message = {
    id,
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

export type UpdateMessage = Pick<Message, 'user'> & {
  notified?: boolean
}
