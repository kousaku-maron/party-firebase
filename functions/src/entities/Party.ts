import { firestore } from 'firebase-admin'

export type Party = {
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

export const buildParty = (data: firestore.DocumentData) => {
  const newParty: Party = {
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    date: data.date.toDate(),
    entryUIDs: data.entryUIDs
  }
  return newParty
}

export type EntryParty = { entryUIDs: firestore.FieldValue }
