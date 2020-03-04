import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, CreateUser, UpdateUser, buildUser } from '../../entities'

export const blockUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const blockUID = uid
  const blockedUID = data.blockedUID as string

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const blockedUserRef = userRef
    .doc(blockUID)
    .collection('blockedUsers')
    .doc(blockedUID)

  const blockedUserSnapShot = await userRef.doc(blockedUID).get()
  const blockedUser = buildUser(blockedUserSnapShot.id!, blockedUserSnapShot.data()!)
  const { id:blockedUserID, ...blockedUserOthers } = blockedUser// eslint-disable-line
  const createBlockedUser = { ...blockedUserOthers }

  batch.set(blockedUserRef, updateDocument<CreateUser>(createBlockedUser), { merge: true })
  batch.set(
    userRef.doc(blockUID),
    updateDocument<UpdateUser>({ blockedUIDs: firestore.FieldValue.arrayUnion(blockedUID) }),
    { merge: true }
  )

  const blockUserRef = userRef
    .doc(blockedUID)
    .collection('blockUsers')
    .doc(blockUID)

  const blockUserSnapShot = await userRef.doc(blockUID).get()
  const blockUser = buildUser(blockUserSnapShot.id!, blockUserSnapShot.data()!)
  const { id:blockUserID, ...blockUserOthers } = blockUser// eslint-disable-line
  const createBlockUser = { ...blockUserOthers }

  batch.set(blockUserRef, updateDocument<CreateUser>(createBlockUser), { merge: true })
  batch.set(
    userRef.doc(blockedUID),
    updateDocument<UpdateUser>({ blockUIDs: firestore.FieldValue.arrayUnion(blockUID) }),
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
