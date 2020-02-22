import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const acceptFriend = functions.https.onCall(async (data, context) => {
  const friendUID = data.friendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const friendRef = userRef
    .doc(friendUID)
    .collection('friends')
    .doc()

  const snapshot = await userRef.doc(uid).get()
  const friend = buildUser(snapshot.data()!)

  batch.set(friendRef, updateDocument<User>(friend), { merge: true })

  batch.set(
    userRef.doc(friendUID),
    updateDocument<UpdateUser>({
      friendUIDs: firestore.FieldValue.arrayUnion(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: friendRef.id,
    path: friendRef.path,
    value: true
  }

  return { message: 'entry party is succeded', contents: [result] }
})
