import { firestore } from 'firebase-admin'
import { User } from './User'
import { Party } from './Party'

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

export const recommendApplyCardPartyID = 'uEobSpZVyqhqt33KjJqZ'
export const recommendApplyCardType = 'today'
export const recommendApplyCardTags = ['everyday']
