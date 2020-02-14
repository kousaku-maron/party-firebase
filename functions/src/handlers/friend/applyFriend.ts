import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const applyFriend = functions.https.onCall(async (data, context) => {
  const appliedFriendsUID = data.appliedFriendsUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const appliedFriendsRef = userRef
    .doc(appliedFriendsUID)
    .collection('appliedFriends')
    .doc()

  const snapshot = await userRef.doc(uid).get()
  const applyingUser = buildUser(snapshot.data()!)

  const convertedApplyingUser: User = {
    enabled: applyingUser.enabled,
    isAccepted: applyingUser.isAccepted,
    isAnonymous: applyingUser.isAnonymous,
    uid: applyingUser.uid,
    userID: applyingUser.userID,
    name: applyingUser.name,
    ...(applyingUser.thumbnailURL && { thumbnailURL: applyingUser.thumbnailURL }),
    ...(applyingUser.gender && { gender: applyingUser.gender }),
    ...(applyingUser.blockUIDs && { blockUIDs: applyingUser.blockUIDs }),
    ...(applyingUser.appliedFriendsUIDs && { appliedFriendsUIDs: applyingUser.appliedFriendsUIDs }),
    ...(applyingUser.acceptedFriendsUIDs && { acceptedFriendsUIDs: applyingUser.acceptedFriendsUIDs })
  }
  batch.set(appliedFriendsRef, updateDocument<User>(convertedApplyingUser), { merge: true })

  batch.set(
    userRef.doc(appliedFriendsUID),
    updateDocument<UpdateUser>({
      appliedFriendsUIDs: firestore.FieldValue.arrayUnion(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: appliedFriendsRef.id,
    path: appliedFriendsRef.path,
    value: true
  }

  return { message: 'entry party is succeded', contents: [result] }
})
