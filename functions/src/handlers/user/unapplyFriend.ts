import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const unapplyFriend = functions.https.onCall(async (data, context) => {
  const unapplyFriendUID = data.unapplyFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const unapplyFriendSnapShot = await usersRef.doc(unapplyFriendUID).get()
  if (!unapplyFriendSnapShot.exists) {
    return { message: `no exist user ${unapplyFriendUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({
      applyFriendUIDs: firestore.FieldValue.arrayRemove(unapplyFriendUID)
    }),
    { merge: true }
  )

  batch.set(
    unapplyFriendSnapShot.ref,
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayRemove(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: unapplyFriendUID
  }

  return { message: 'unapply friend is succeded', contents: [result] }
})
