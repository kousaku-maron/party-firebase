import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

// MEMO: 「友達申請した」と「友達申請された」でトリガー分けてもいい。
export const deleteApplyAndAppliedFriendUser = functions.firestore
  .document(userPath)
  .onUpdate(async (change, context) => {
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

    // MEMO: 友達申請したユーザーを削除
    const deleteApplyFriendUIDs = difference(userBefore.applyFriendUIDs ?? [], userAfter.applyFriendUIDs ?? [])

    const applyFriendUsersRef = db
      .collection('users')
      .doc(uid)
      .collection('applyFriendUsers')

    if (deleteApplyFriendUIDs.length > 0) {
      const task = deleteApplyFriendUIDs.map(async applyFriendUID => {
        const targetUsersRef = applyFriendUsersRef.where('uid', '==', applyFriendUID)

        const targetUsersSnapShot = await targetUsersRef.get()
        if (targetUsersSnapShot.docs.length !== 1) return

        const targetUserRef = targetUsersSnapShot.docs[0].ref
        batch.delete(targetUserRef)
      })

      await Promise.all(task)
    }

    // MEMO: 友達申請されたユーザーを削除
    const deleteAppliedFriendUIDs = difference(userBefore.appliedFriendUIDs ?? [], userAfter.appliedFriendUIDs ?? [])

    const appliedFriendUsersRef = db
      .collection('users')
      .doc(uid)
      .collection('appliedFriendUsers')

    if (deleteAppliedFriendUIDs.length > 0) {
      const task = deleteAppliedFriendUIDs.map(async appliedFriendUID => {
        const targetUsersRef = appliedFriendUsersRef.where('uid', '==', appliedFriendUID)

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

    return { message: 'apply and applied friend users are deleted successfully', contents: [result] }
  })
