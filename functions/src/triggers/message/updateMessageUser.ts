import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, updateDocument, UpdateMessage } from '../../entities'

const userPath = 'users/{uid}'

export const updateMessageUser = functions.firestore.document(userPath).onUpdate(async (change, _context) => {
  const userSnapShot = await change.after.ref.get()
  if (!userSnapShot.exists) {
    throw new Error('not found user')
  }

  const user = buildUser(userSnapShot.id!, userSnapShot.data()!)

  const db = firestore()
  const batch = db.batch()

  const roomsRef = db.collection('rooms')
  const roomsSnapshot = await roomsRef.where('entryUIDs', 'array-contains', user.uid).get()
  const roomIDs = roomsSnapshot.docs.map(roomDoc => roomDoc.id)

  // TODO: 100件でbatchを再回帰的に実行させるようにする。
  const tasks = roomIDs.map(async roomID => {
    const messagesRef = roomsRef.doc(roomID).collection('messages')
    const messagesSnapshot = await messagesRef.where('writerUID', '==', user.uid).get()
    messagesSnapshot.docs.map(messageDoc => {
      batch.set(
        messageDoc.ref,
        updateDocument<UpdateMessage>({ user }),
        { merge: true }
      )
    })
  })

  await Promise.all(tasks)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: user
  }

  return { message: 'Message users is updated successfully', contents: [result] }
})
