import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, CreateUser, UpdateUser, buildUser } from '../../entities'

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
  const applyFriendUser = buildUser(applyFriendSnapShot.id!, applyFriendSnapShot.data()!)
  const { id:applyFriendUserdID, ...applyFriendUserOthers } = applyFriendUser// eslint-disable-line
  const createApplyFriendUserOthers = { ...applyFriendUserOthers }

  batch.set(applyFriendUserRef, updateDocument<CreateUser>(createApplyFriendUserOthers), { merge: true })
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
  const appliedFriendUser = buildUser(appliedFriendSnapShot.id!, appliedFriendSnapShot.data()!)
  const { id:appliedFriendUserdID, ...appliedFriendUserOthers } = appliedFriendUser// eslint-disable-line
  const createAppliedFriendUserOthers = { ...appliedFriendUserOthers }

  batch.set(appliedFriendUserRef, updateDocument<CreateUser>(createAppliedFriendUserOthers), { merge: true })
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
