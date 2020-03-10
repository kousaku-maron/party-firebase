import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const unblockUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const unblockUID = data.unblockUID as string

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const unblockSnapShot = await usersRef.doc(unblockUID).get()
  if (!unblockSnapShot.exists) {
    return { message: `no exist user ${unblockUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ blockUIDs: firestore.FieldValue.arrayRemove(unblockUID) }),
    { merge: true }
  )

  batch.set(
    unblockSnapShot.ref,
    updateDocument<UpdateUser>({ blockedUIDs: firestore.FieldValue.arrayRemove(uid) }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: unblockUID
  }

  return { message: 'unblock user is succeded', contents: [result] }
})
