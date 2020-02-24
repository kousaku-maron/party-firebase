import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const applyFriend = functions.https.onCall(async (data, context) => {
  const appliedFriendUID = data.appliedFriendUID as string
  const uid = context!.auth!.uid
  const applyFriendUID = uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const applyFriendUserRef = userRef
    .doc(appliedFriendUID)
    .collection('applyFriendUsers')
    .doc(applyFriendUID)

  const applyFriendSnapShot = await userRef.doc(applyFriendUID).get()
  const applyFriendUser = buildUser(applyFriendSnapShot.data()!)

  batch.set(applyFriendUserRef, updateDocument<User>(applyFriendUser), { merge: true })
  batch.set(
    userRef.doc(appliedFriendUID),
    updateDocument<UpdateUser>({
      applyFriendUIDs: firestore.FieldValue.arrayUnion(applyFriendUID)
    }),
    { merge: true }
  )

  const appliedFriendUserRef = userRef
    .doc(applyFriendUID)
    .collection('appliedFriendUsers')
    .doc(appliedFriendUID)

  const appliedFriendSnapShot = await userRef.doc(appliedFriendUID).get()
  const appliedFriendUser = buildUser(appliedFriendSnapShot.data()!)

  batch.set(appliedFriendUserRef, updateDocument<User>(appliedFriendUser), { merge: true })
  batch.set(
    userRef.doc(applyFriendUID),
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayUnion(appliedFriendUID)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    applyFriendUserID: applyFriendUserRef.id,
    applyFriendUserPath: applyFriendUserRef.path,
    appliedFriendUserID: appliedFriendUserRef.id,
    appliedFriendUserPath: appliedFriendUserRef.path,
    value: true
  }

  return { message: 'entry party is succeded', contents: [result] }
})
