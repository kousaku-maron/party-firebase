import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const blockUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const blockUID = data.blockUID as string

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const blockSnapShot = await usersRef.doc(blockUID).get()
  if (!blockSnapShot.exists) {
    return { message: `no exist user ${blockUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ blockUIDs: firestore.FieldValue.arrayUnion(blockUID) }),
    { merge: true }
  )

  batch.set(
    blockSnapShot.ref,
    updateDocument<UpdateUser>({ blockedUIDs: firestore.FieldValue.arrayUnion(uid) }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: blockUID
  }

  return { message: 'block user is succeded', contents: [result] }
})
