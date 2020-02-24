import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const acceptFriend = functions.https.onCall(async (data, context) => {
  const friendUID = data.friendUID as string
  const uid = context!.auth!.uid

  const acceptedFriendUID = uid
  const acceptFriendUID = friendUID

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const acceptedFriendRef = userRef
    .doc(acceptFriendUID)
    .collection('friends')
    .doc(acceptedFriendUID)

  const applyFriendUserRef = userRef
    .doc(acceptFriendUID)
    .collection('applyFriendUsers')
    .doc(acceptedFriendUID)

  const acceptedUserSnapShot = await userRef.doc(acceptedFriendUID).get()
  const acceptedFriend = buildUser(acceptedUserSnapShot.data()!)

  batch.set(acceptedFriendRef, updateDocument<User>(acceptedFriend), { merge: true })
  batch.set(
    userRef.doc(acceptFriendUID),
    updateDocument<UpdateUser>({
      friendUIDs: firestore.FieldValue.arrayUnion(acceptedFriendUID),
      applyFriendUIDs: firestore.FieldValue.arrayRemove(acceptedFriendUID)
    }),
    { merge: true }
  )
  batch.delete(applyFriendUserRef)

  const acceptFriendRef = userRef
    .doc(acceptedFriendUID)
    .collection('friends')
    .doc(acceptFriendUID)

  const appliedFriendUserRef = userRef
    .doc(acceptedFriendUID)
    .collection('appliedFriendUsers')
    .doc(acceptFriendUID)

  const acceptUserSnapShot = await userRef.doc(acceptFriendUID).get()
  const accepFriendUser = buildUser(acceptUserSnapShot.data()!)
  batch.set(acceptFriendRef, updateDocument<User>(accepFriendUser), { merge: true })
  batch.set(
    userRef.doc(acceptedFriendUID),
    updateDocument<UpdateUser>({
      friendUIDs: firestore.FieldValue.arrayUnion(acceptFriendUID),
      appliedFriendUIDs: firestore.FieldValue.arrayRemove(acceptFriendUID)
    }),
    { merge: true }
  )
  batch.delete(appliedFriendUserRef)

  await batch.commit()

  const result = {
    acceptFriendRefID: acceptFriendRef.id,
    acceptFriendRefPath: acceptFriendRef.path,
    acceptedFriendRefID: acceptedFriendRef.id,
    acceptedFriendRefPath: acceptedFriendRef.path,
    value: true
  }

  return { message: 'entry party is succeded', contents: [result] }
})
