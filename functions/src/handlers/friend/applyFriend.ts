import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, User, UpdateUser, buildUser } from '../../entities'

export const applyFriend = functions.https.onCall(async (data, context) => {
  const appliedFriendUID = data.appliedFriendUID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users')
  const appliedFriendsRef = userRef
    .doc(appliedFriendUID)
    .collection('appliedFriends')
    .doc()
  const snapshot = await userRef.doc(uid).get()
  const user = buildUser(snapshot.data()!)
  const convertedAppliedFriend: User = {
    enabled: user.enabled,
    isAccepted: user.isAccepted,
    isAnonymous: user.isAnonymous,
    uid: user.uid,
    userID: user.userID,
    name: user.name,
    ...(user.thumbnailURL && { thumbnailURL: user.thumbnailURL }),
    ...(user.gender && { gender: user.gender }),
    ...(user.blockUIDs && { blockUIDs: user.blockUIDs }),
    ...(user.appliedFriendsUIDs && { appliedFriendsUIDs: user.appliedFriendsUIDs }),
    ...(user.acceptedFriendsUIDs && { acceptedFriendsUIDs: user.acceptedFriendsUIDs })
  }

  batch.set(appliedFriendsRef, updateDocument<User>(convertedAppliedFriend), { merge: true })

  batch.set(
    userRef.doc(appliedFriendUID),
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
