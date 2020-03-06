import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { UpdateRoom, buildRoom, updateDocument } from '../../entities'
import { createListHash } from '../../services/util'

const roomPath = 'rooms/{roomID}'

export const updateRoomHash = functions.firestore.document(roomPath).onUpdate(async (change, _context) => {
  const roomSnapShot = await change.after.ref.get()
  if (!roomSnapShot.exists) {
    throw new Error('not found room')
  }

  const room = buildRoom(roomSnapShot.id, roomSnapShot.data()!)

  const currentRoomHash = room.roomHash
  const newRoomHash = createListHash(room.entryUIDs ? room.entryUIDs : [])

  if (currentRoomHash === newRoomHash) {
    return {
      message: 'Room hash is already updated.',
      contents: {
        documentID: change.after.ref,
        path: change.after.ref.path,
        value: room
      }
    }
  }

  const db = firestore()
  const batch = db.batch()

  batch.set(
    change.after.ref,
    updateDocument<UpdateRoom>({ roomHash: newRoomHash }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: room
  }

  return { message: 'Room hash is updated successfully', contents: [result] }
})
