import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const acceptFriend = functions.https.onCall(async (data, context) => {
  const acceptFriendUID = data.acceptFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const acceptFriendSnapShot = await usersRef.doc(acceptFriendUID).get()
  if (!acceptFriendSnapShot.exists) {
    return { message: `no exist user ${acceptFriendUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({
      friendUIDs: firestore.FieldValue.arrayUnion(acceptFriendUID),
      appliedFriendUIDs: firestore.FieldValue.arrayRemove(acceptFriendUID)
    }),
    { merge: true }
  )

  batch.set(
    acceptFriendSnapShot.ref,
    updateDocument<UpdateUser>({
      friendUIDs: firestore.FieldValue.arrayUnion(uid),
      applyFriendUIDs: firestore.FieldValue.arrayRemove(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: acceptFriendUID
  }

  return { message: 'accept friend is succeded', contents: [result] }
})
