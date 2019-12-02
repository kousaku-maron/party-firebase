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

// same User type
export type MessageUser = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
}

export type Message = {
  text: string
  createdAt: Date
  imageURL?: string
  videoURL?: string
  user?: MessageUser
  writerUID?: string
  system: boolean
  quickReplies?: QuickReplies
}

export const buildMessage = (data: firestore.DocumentData) => {
  const newMessage = {
    text: data.text,
    createdAt: data.createdAt.toDate(),
    imageURL: data.imageURL,
    videoURL: data.videoURL,
    user: data.user,
    writerUID: data.writerUID,
    system: data.system,
    quickReplies: data.quickReplies
  }
  return newMessage
}

export const partyMaster: MessageUser = {
  enabled: true,
  isAccepted: true,
  isAnonymous: false,
  uid: 'tYwmmOkToqWSY7Eaq07YadJpngA',
  userID: 'nyIMVTf3oCMK2OT6D9wc',
  name: 'Party Master',
  thumbnailURL: 'gs://insta-693eb.appspot.com/users/tYwmmOkToqWSY7Eaq07YadJpngA/thumbs/jigsaw_200x200.jpg',
  gender: 'male'
}

//MEMO:現在はparty masterを埋め込みにしてるが，将来的にdocumentからとってくる可能性があるため残しています
export const buildMessageUser = (data: firestore.DocumentData) => {
  const user: MessageUser = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    thumbnailURL: data.thumbnailURL || null,
    gender: data.gender || null
  }

  return user
}

export type CreateMessage = Pick<
  Message,
  'text' | 'user' | 'writerUID' | 'system' | 'quickReplies' | 'imageURL' | 'videoURL'
>
