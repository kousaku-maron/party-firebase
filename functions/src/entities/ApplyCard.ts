import { firestore } from 'firebase-admin'

// same origin User type
type User = {
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

//same as Party type
type Party = {
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

export type ApplyCard = {
  id: string
  partyID: string
  groupID: string
  organizerUID: string
  users: User[]
  party: Party
  type: string
}

export const buildApplyCard = (id: string, data: firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    users: data.users,
    party: data.party,
    type: data.type
  }

  return newApplyCard
}

export type CreateApplyCard = Omit<ApplyCard, 'id'>

//MEMO: 一時的に横浜のIDをとってきています　恐らく将来的には参加しているpartyのIDを使います
export const recommendApplyCardPartyID = 'ifnY4xa1BmHlf0qdQR2Z'
export const recommendApplyCardType = 'today'
