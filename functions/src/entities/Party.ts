import { firestore } from 'firebase-admin'
import { User } from './User'

export type Party = {
  id: string
  type: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[]
  users?: User[]
  tags?: string[]
}

export const buildParty = (id: string, data: firestore.DocumentData) => {
  const newParty: Party = {
    id,
    type: data.type,
    name: data.name,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    enabled: data.enabled,
    date: data.date.toDate(),
    ...(data.entryUIDs && { entryUIDs: data.entryUIDs }),
    ...(data.users && { users: data.users }),
    ...(data.tags && { tags: data.tags })
  }
  return newParty
}

export type EntryParty = { entryUIDs: firestore.FieldValue }

export type CreateParty = Omit<Party, 'id'>
