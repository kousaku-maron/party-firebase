import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildMessage, updateDocument, UpdateRoom } from '../../entities'

const messagePath = 'rooms/{roomID}/messages/{messageID}'

export const updateNewMessage = functions.firestore.document(messagePath).onCreate(async (snap, context) => {
  if (!snap.exists) {
    return { message: `not exist message`, contents: null }
  }

  const roomID = context.params.roomID

  const messageSnapshot = await snap.ref.get()
  if (!messageSnapshot.exists) {
    return { message: `not exists message` }
  }

  const message = buildMessage(messageSnapshot.id, messageSnapshot.data()!)

  const db = firestore()

  const roomRef = db.collection('rooms').doc(roomID)
  const roomSnapshot = await roomRef.get()

  if (!roomSnapshot.exists) {
    return { message: `not exists ${roomID} room` }
  }

  const batch = db.batch()

  batch.set(
    roomSnapshot.ref,
    updateDocument<UpdateRoom>({ newMessage: message }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: snap.ref,
    path: snap.ref.path,
    value: message
  }

  return { message: 'update new message is succeded', contents: [result] }
})
