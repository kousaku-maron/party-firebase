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

  const convertedFriend: User = {
    enabled: friend.enabled,
    isAccepted: friend.isAccepted,
    isAnonymous: friend.isAnonymous,
    uid: friend.uid,
    userID: friend.userID,
    name: friend.name,
    thumbnailURL: friend.thumbnailURL,
    gender: friend.gender,
    blockUIDs: friend.blockUIDs,
    appliedFriendUIDs: friend.appliedFriendUIDs,
    friendUIDs: friend.friendUIDs
  }
  batch.set(friendRef, updateDocument<User>(convertedFriend), { merge: true })

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
