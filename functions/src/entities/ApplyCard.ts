import { firestore } from 'firebase-admin'

// same origin User type
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
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
}

//same as Party type
type Party = {
  id: string
  name: string
  type: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

//MEMO: いったんuserはなしにする
export type ApplyCard = {
  id: string
  partyID: string
  groupID: string
  organizerUID: string
  members: User[]
  party: Party
  type: string
}

export const buildApplyCard = (id: string, data: firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    members: data.members,
    party: data.party,
    type: data.type
  }

  return newApplyCard
}

export type CreateApplyCard = Omit<ApplyCard, 'id'>

//MEMO: 一時的に横浜のIDをとってきています　恐らく将来的には参加しているpartyのIDを使います
export const recommendApplyCardPartyID = 'uEobSpZVyqhqt33KjJqZ'
export const recommendApplyCardType = 'today'
