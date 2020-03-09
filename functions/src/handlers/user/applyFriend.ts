import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const applyFriend = functions.https.onCall(async (data, context) => {
  const applyFriendUID = data.applyFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const applyFriendSnapShot = await usersRef.doc(applyFriendUID).get()
  if (!applyFriendSnapShot.exists) {
    return { message: `no exist user ${applyFriendUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayUnion(applyFriendUID)
    }),
    { merge: true }
  )

  batch.set(
    applyFriendSnapShot.ref,
    updateDocument<UpdateUser>({
      applyFriendUIDs: firestore.FieldValue.arrayUnion(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: applyFriendUID
  }

  return { message: 'apply friend is succeded', contents: [result] }
})
