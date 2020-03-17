import { firestore } from 'firebase-admin'
import { User, buildUser } from './User'

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
    ...(data.imageURL && { imageURL: data.imageURL }),
    ...(data.videoURL && { videoURL: data.videoURL }),
    ...(data.user && { user: buildUser(data.user.id, data.user) }),
    ...(data.writerUID && { writerUID: data.writerUID }),
    system: data.system,
    ...(data.quickReplies && { quickReplies: data.quickReplies }),
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
