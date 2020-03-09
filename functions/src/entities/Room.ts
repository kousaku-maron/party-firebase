import { firestore } from 'firebase-admin'
import { Message } from './Message'
import { User } from './User'

export type Room = {
  id: string
  enabled: boolean
  roomHash: string
  name?: string
  thumbnailURL?: string
  entryUIDs?: string[]
  newMessage?: Message
  users: User[]
}

export const buildRoom = (id: string, data: firestore.DocumentData) => {
  const newRoom: Room = {
    id,
    enabled: data.enabled,
    roomHash: data.roomHash,
    ...(data.name && { name: data.name }),
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.entryUIDs && { entryUIDs: data.entryUIDs }),
    ...(data.newMessage && { newMessage: data.newMessage }),
    users: data.users
  }
  return newRoom
}

export type CreateRoom = Omit<Room, 'id'>

export type UpdateRoom = Pick<Room, 'name' | 'thumbnailURL' | 'newMessage'> & {
  roomHash?: string
}
