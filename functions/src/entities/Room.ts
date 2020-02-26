import { firestore } from 'firebase-admin'

export type Room = {
  //TODO: id追加
  enabled: boolean
  roomHash: string
  name?: string
  thumbnailURL?: string
  entryUIDs?: string[]
}

export const buildRoom = (data: firestore.DocumentData) => {
  const newRoom: Room = {
    enabled: data.enabled,
    roomHash: data.roomHash,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    entryUIDs: data.entryUIDs
  }
  return newRoom
}

export type UpdateRoom = Pick<Room, 'name' | 'thumbnailURL'> & {
  roomHash?: string
}
