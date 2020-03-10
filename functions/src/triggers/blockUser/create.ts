import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, createDocument, User } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

// MEMO: 「ブロックした」と「ブロックされた」でトリガー分けてもいい。
export const createBlockAndBlockedUser = functions.firestore.document(userPath).onUpdate(async (change, context) => {
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

  // MEMO: ブロックしたユーザーを保存
  const newBlockUIDs = difference(userAfter.blockUIDs ?? [], userBefore.blockUIDs ?? [])

  const blockUsersRef = db
    .collection('users')
    .doc(uid)
    .collection('blockUsers')

  if (newBlockUIDs.length > 0) {
    const task = newBlockUIDs.map(async blockUID => {
      const blockUserRef = db.collection('users').doc(blockUID)
      const blockUserSnapShot = await blockUserRef.get()
      if (!blockUserSnapShot.exists) return

      const blockUser = buildUser(blockUserSnapShot.id!, blockUserSnapShot.data()!)
      batch.set(
        blockUsersRef.doc(blockUID),
        createDocument<User>({ ...blockUser }),
        { merge: true }
      )
    })

    await Promise.all(task)
  }

  // MEMO: ブロックされたユーザーを保存
  const newBlockedUIDs = difference(userAfter.blockedUIDs ?? [], userBefore.blockedUIDs ?? [])

  const blockedUsersRef = db
    .collection('users')
    .doc(uid)
    .collection('blockedUsers')

  if (newBlockedUIDs.length > 0) {
    const task = newBlockedUIDs.map(async blockedUID => {
      const blockedUserRef = db.collection('users').doc(blockedUID)
      const blockedUserSnapShot = await blockedUserRef.get()
      if (!blockedUserSnapShot.exists) return

      const blockedUser = buildUser(blockedUserSnapShot.id!, blockedUserSnapShot.data()!)
      batch.set(
        blockedUsersRef.doc(blockedUID),
        createDocument<User>({ ...blockedUser }),
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

  return { message: 'block and blocked users are created successfully', contents: [result] }
})
