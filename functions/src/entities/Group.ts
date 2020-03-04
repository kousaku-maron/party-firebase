import { firestore } from 'firebase-admin'

// TODO: 本当に必要なパラメーターのみ保存するよう見直す。

//Same as User
type User = {
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
}

export type Group = {
  id: string
  organizer: User
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firestore.DocumentData) => {
  const newGroup: Group = {
    id,
    organizer: data.organizer,
    appliedUIDs: data.appliedUIDs
  }

  return newGroup
}

export type CreateGroup = Omit<Group, 'id'>
