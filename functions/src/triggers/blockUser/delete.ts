import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

// MEMO: 「ブロックした」と「ブロックされた」でトリガー分けてもいい。
export const deleteBlockAndBlockedUser = functions.firestore.document(userPath).onUpdate(async (change, context) => {
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

  // MEMO: ブロックしたユーザーを削除
  const deleteBlockUIDs = difference(userBefore.blockUIDs ?? [], userAfter.blockUIDs ?? [])

  const blockUsersRef = db
    .collection('users')
    .doc(uid)
    .collection('blockUsers')

  if (deleteBlockUIDs.length > 0) {
    const task = deleteBlockUIDs.map(async blockUID => {
      const targetUsersRef = blockUsersRef.where('uid', '==', blockUID)

      const targetUsersSnapShot = await targetUsersRef.get()
      if (targetUsersSnapShot.docs.length !== 1) return

      const targetUserRef = targetUsersSnapShot.docs[0].ref
      batch.delete(targetUserRef)
    })

    await Promise.all(task)
  }

  // MEMO: ブロックされたユーザーを削除
  const deleteBlockedUIDs = difference(userBefore.blockedUIDs ?? [], userAfter.blockedUIDs ?? [])

  const blockedUsersRef = db
    .collection('users')
    .doc(uid)
    .collection('blockedUsers')

  if (deleteBlockedUIDs.length > 0) {
    const task = deleteBlockedUIDs.map(async blockedUID => {
      const targetUsersRef = blockedUsersRef.where('uid', '==', blockedUID)

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

  return { message: 'block and blocked users are deleted successfully', contents: [result] }
})
