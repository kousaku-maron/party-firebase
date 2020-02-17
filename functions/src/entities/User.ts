import { firestore } from 'firebase-admin'

export type User = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
  blockUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
}

export const buildUser = (data: firestore.DocumentData) => {
  const newUser: User = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.gender && { gender: data.gender }),
    ...(data.blockUIDs && { blockUIDs: data.blockUIDs }),
    ...(data.appliedFriendUIDs && { appliedFriendUIDs: data.appliedFriendUIDs }),
    ...(data.friendUIDs && { friendUIDs: data.friendUIDs })

  }

  return newUser
}

export const initialUser = ({
  uid,
  userID,
  name,
  isAnonymous
}: {
  uid: string
  userID: string
  name: string
  isAnonymous: boolean
}) => {
  const user: User = {
    enabled: true,
    isAccepted: false,
    isAnonymous,
    uid,
    userID,
    name
  }

  return user
}

export const ANONYMOUS_USERNAME = 'anonymous'

export const partyMaster: User = {
  enabled: true,
  isAccepted: true,
  isAnonymous: false,
  uid: 'tYwmmOkToqWSY7Eaq07YadJpngA',
  userID: 'nyIMVTf3oCMK2OT6D9wc',
  name: 'パーティーマスター　どなちゃん',
  thumbnailURL:
    'https://firebasestorage.googleapis.com/v0/b/insta-693eb.appspot.com/o/users%2FtYwmmOkToqWSY7Eaq07YadJpngA%2Fb5cf6194b4f4e735bcf9d3cbac3de0f0.jpg?alt=media&token=48e7aebf-edf7-4a12-b465-c0d23df3076d',
  gender: 'male'
}

export type UpdateAppliedFriend = {
  positiveReplies?: firestore.FieldValue
  negativeReplies?: firestore.FieldValue
  repliedUIDs?: firestore.FieldValue
  isSendEventMessage?: boolean
}

export type UpdateUser = {
  appliedFriendUIDs?: firestore.FieldValue
  friendUIDs?: firestore.FieldValue
}
