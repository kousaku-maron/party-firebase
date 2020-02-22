import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const applyFriend = functions.https.onCall(async (data, context) => {
  const appliedFriendUID = data.appliedFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const appliedFriendRef = userRef
    .doc(appliedFriendUID)
    .collection('appliedFriendUsers')
    .doc()

  const snapshot = await userRef.doc(uid).get()
  const applyingUser = buildUser(snapshot.data()!)

  batch.set(appliedFriendRef, updateDocument<User>(applyingUser), { merge: true })

  batch.set(
    userRef.doc(appliedFriendUID),
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayUnion(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: appliedFriendRef.id,
    path: appliedFriendRef.path,
    value: true
  }

  return { message: 'entry party is succeded', contents: [result] }
})