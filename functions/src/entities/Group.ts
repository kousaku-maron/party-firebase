import { firestore } from 'firebase-admin'
import { User } from './User'

export type Group = {
  id: string
  organizerUID: string
  organizer: User
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firestore.DocumentData) => {
  const newGroup: Group = {
    id,
    organizerUID: data.organizerUID,
    organizer: data.organizer,
    appliedUIDs: data.appliedUIDs
  }

  return newGroup
}

export type CreateGroup = Omit<Group, 'id'>
