import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

export const deleteFriend = functions.firestore.document(userPath).onUpdate(async (change, context) => {
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

  const deleteFriendUIDs = difference(userBefore.friendUIDs ?? [], userAfter.friendUIDs ?? [])

  const friendsRef = db
    .collection('users')
    .doc(uid)
    .collection('friends')

  if (deleteFriendUIDs.length > 0) {
    const task = deleteFriendUIDs.map(async friendUID => {
      const targetUsersRef = friendsRef.where('uid', '==', friendUID)

      const targetUsersSnapShot = await targetUsersRef.get()
      if (targetUsersSnapShot.docs.length !== 1) return

      const targetUserRef = targetUsersSnapShot.docs[0].ref
      batch.delete(targetUserRef)
    })

    await Promise.all(task)
  }

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: userAfter
  }

  return { message: 'friend are deleted successfully', contents: [result] }
})
