import { firestore } from 'firebase-admin'

export type Room = {
  enabled: boolean
  roomHash: string
  thumbnailURL?: string
  entryUIDs?: string[]
}

export const buildRoom = (data: firestore.DocumentData) => {
  const newRoom: Room = {
    enabled: data.enabled,
    roomHash: data.roomHash,
    thumbnailURL: data.thumbnailURL,
    entryUIDs: data.entryUIDs
  }
  return newRoom
}
