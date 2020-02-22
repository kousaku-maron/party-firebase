import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const blockUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const blockUserUID = uid
  const blockedUserUID = data.blockedUserUID as string

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const blockedUserRef = userRef
    .doc(blockedUserUID)
    .collection('blockedUser')
    .doc(blockedUserUID)

  const blockedUserSnapShot = await userRef.doc(blockedUserUID).get()
  const blockedUser = buildUser(blockedUserSnapShot)

  batch.set(blockedUserRef, updateDocument<User>(blockedUser), { merge: true })
  batch.set(
    userRef.doc(blockUserUID),
    updateDocument<UpdateUser>({ blockedUserUIDs: firestore.FieldValue.arrayUnion(blockedUserUID) }),
    { merge: true }
  )

  const blockUserRef = userRef
    .doc(blockedUserUID)
    .collection('blockUser')
    .doc(blockedUserUID)

  const blockUserSnapShot = await userRef.doc(blockUserUID).get()
  const blockUser = buildUser(blockUserSnapShot)

  batch.set(blockUserRef, updateDocument<User>(blockUser), { merge: true })
  batch.set(
    userRef.doc(blockedUserUID),
    updateDocument<UpdateUser>({ blockUserUIDs: firestore.FieldValue.arrayUnion(blockUserUID) }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    blockedUserID: blockedUserRef.id,
    blockedUserPath: blockedUserRef.path,
    blockUserID: blockUserRef.id,
    blockUserPath: blockUserRef.path,
    value: true
  }

  return { message: 'block user is succeded', contents: [result] }
})
