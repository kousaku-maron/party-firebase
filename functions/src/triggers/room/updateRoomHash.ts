import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { UpdateRoom, buildRoom, updateDocument } from '../../entities'
import { createHash } from 'crypto'

const roomPath = 'rooms/{roomID}'

export const updateRoomHash = functions.firestore.document(roomPath).onUpdate(async (change, _context) => {
  const roomSnapShot = await change.after.ref.get()
  if (!roomSnapShot.exists) {
    throw new Error('not found room')
  }

  const room = buildRoom(roomSnapShot.data()!)
  const currentRoomHash = room.roomHash

  const baseStr = room.entryUIDs
    ? room.entryUIDs
        .slice()
        .sort()
        .join('')
    : ''

  const newRoomHash = createHash('sha256')
    .update(baseStr, 'utf8')
    .digest('hex')

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
