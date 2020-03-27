import { firestore } from 'firebase-admin'
import { User } from './User'

export type Group = {
  id: string
  organizerUID: string
  organizer: User
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firestore.DocumentData) => {
  const newGroup: Group = {
    id,
    organizerUID: data.organizerUID,
    organizer: data.organizer,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }

  return newGroup
}

export type CreateGroup = Omit<Group, 'id'>
