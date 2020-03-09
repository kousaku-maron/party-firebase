import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser } from '../../entities'

export const refuseFriend = functions.https.onCall(async (data, context) => {
  const refuseFriendUID = data.refuseFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const refuseFriendSnapShot = await usersRef.doc(refuseFriendUID).get()
  if (!refuseFriendSnapShot.exists) {
    return { message: `no exist user ${refuseFriendUID}`, contents: null }
  }

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({
      appliedFriendUIDs: firestore.FieldValue.arrayRemove(refuseFriendUID)
    }),
    { merge: true }
  )

  // MEMO: 申請拒否を受け取らせたくない場合は、この箇所変える。
  batch.set(
    refuseFriendSnapShot.ref,
    updateDocument<UpdateUser>({
      applyFriendUIDs: firestore.FieldValue.arrayRemove(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: usersRef.doc(uid).id,
    path: usersRef.doc(uid).path,
    value: refuseFriendUID
  }

  return { message: 'refuse friend is succeded', contents: [result] }
})
