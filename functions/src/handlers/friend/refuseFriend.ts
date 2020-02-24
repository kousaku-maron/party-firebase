import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const refuseFriend = functions.https.onCall(async (data, context) => {
  const refusedFriendUID = data.refusedFriendUID as string
  const uid = context!.auth!.uid

  const refuseFriendUID = uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')

  const refusedFriendUserRef = userRef
    .doc(refuseFriendUID)
    .collection('applyFriendUsers')
    .doc(refusedFriendUID)
  batch.set(
    userRef.doc(refuseFriendUID),
    updateDocument<UpdateUser>({
      applyFriendUIDs: firestore.FieldValue.arrayRemove(refusedFriendUID)
    }),
    { merge: true }
  )
  batch.delete(refusedFriendUserRef)

  const refuseFriendUserRef = userRef
    .doc(refusedFriendUID)
    .collection('appliedFriendUsers')
    .doc(refuseFriendUID)
  batch.set(
    userRef.doc(refusedFriendUID),
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayRemove(refuseFriendUID)
    }),
    { merge: true }
  )
  batch.delete(refuseFriendUserRef)

  await batch.commit()

  const result = {
    refuseFriendRefID: refuseFriendUserRef.id,
    refuseFriendRefPath: refuseFriendUserRef.path,
    refusedFriendRefID: refusedFriendUserRef.id,
    refusedFriendRefPath: refusedFriendUserRef.path,
    value: true
  }

  return { message: 'refuse friend is succeded', contents: [result] }
})
