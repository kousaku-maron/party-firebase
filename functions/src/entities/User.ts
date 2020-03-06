import { firestore } from 'firebase-admin'

export type User = {
  id: string
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
  blockUIDs?: string[]
  blockedUIDs?: string[]
  applyFriendUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
  reportUIDs?: string[]
  reportedUIDs?: string[]
  likeGroupAssetIDs?: string[]
  likedGroupAssetIDs?: string[]
  matchGroupAssetIDs?: string[]
  myGroupAssetIDs?: string[]
}

export const buildUser = (id: string, data: firestore.DocumentData) => {
  const newUser: User = {
    id,
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.gender && { gender: data.gender }),
    ...(data.blockUIDs && { blockUIDs: data.blockUIDs }),
    ...(data.blockedUIDs && { blockedUIDs: data.blockedUIDs }),
    ...(data.applyFriendUIDs && { applyFriendUIDs: data.applyFriendUIDs }),
    ...(data.appliedFriendUIDs && { appliedFriendUIDs: data.appliedFriendUIDs }),
    ...(data.friendUIDs && { friendUIDs: data.friendUIDs }),
    ...(data.reportUIDs && { reportUIDs: data.reportUIDs }),
    ...(data.reportedUIDs && { reportedUIDs: data.reportedUIDs }),
    ...(data.likeGroupAssetIDs && { likeGroupAssetIDs: data.likeGroupAssetIDs }),
    ...(data.likedGroupAssetIDs && { likedGroupAssetIDs: data.likedGroupAssetIDs }),
    ...(data.matchGroupAssetIDs && { matchGroupAssetIDs: data.matchGroupAssetIDs }),
    ...(data.myGroupAssetAssetIDs && { myGroupAssetAssetIDs: data.myGroupAssetAssetIDs })
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
  const user: CreateUser = {
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

export type UpdateAppliedFriend = {
  positiveReplies?: firestore.FieldValue
  negativeReplies?: firestore.FieldValue
  repliedUIDs?: firestore.FieldValue
  isSendEventMessage?: boolean
}

export type CreateUser = Omit<User, 'id'>

export type UpdateUser = {
  blockUIDs?: firestore.FieldValue
  blockedUIDs?: firestore.FieldValue
  applyFriendUIDs?: firestore.FieldValue
  appliedFriendUIDs?: firestore.FieldValue
  friendUIDs?: firestore.FieldValue
  reportUIDs?: firestore.FieldValue
  reportedUIDs?: firestore.FieldValue
  likeGroupAssetIDs?: firestore.FieldValue
  likedGroupAssetIDs?: firestore.FieldValue
  matchGroupAssetIDs?: firestore.FieldValue
  myGroupAssetIDs?: firestore.FieldValue
}

export const partyMaster: User = {
  id: 'tYwmmOkToqWSY7Eaq07YadJpngA',
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
