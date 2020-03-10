import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, createDocument, User } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

export const createFriend = functions.firestore.document(userPath).onUpdate(async (change, context) => {
  const userBeforeSnapShot = await change.before.ref.get()
  const userAfterSnapShot = await change.after.ref.get()
  if (!userBeforeSnapShot.exists || !userAfterSnapShot.exists) {
    throw new Error('not found user')
  }

  const uid = context.params.uid

  const userBefore = buildUser(change.before.id!, change.before.data()!)
  const userAfter = buildUser(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const newFriendUIDs = difference(userAfter.friendUIDs ?? [], userBefore.friendUIDs ?? [])

  const friendsRef = db
    .collection('users')
    .doc(uid)
    .collection('friends')

  if (newFriendUIDs.length > 0) {
    const task = newFriendUIDs.map(async friendUID => {
      const friendRef = db.collection('users').doc(friendUID)
      const friendSnapShot = await friendRef.get()
      if (!friendSnapShot.exists) return

      const friend = buildUser(friendSnapShot.id!, friendSnapShot.data()!)
      batch.set(
        friendsRef.doc(friendUID),
        createDocument<User>({ ...friend }),
        { merge: true }
      )
    })

    await Promise.all(task)
  }

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: userAfter
  }

  return { message: 'friend are created successfully', contents: [result] }
})
