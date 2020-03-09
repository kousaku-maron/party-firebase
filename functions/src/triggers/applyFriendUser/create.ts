import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, createDocument, User } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{uid}'

// MEMO: 「友達申請した」と「友達申請された」でトリガー分けてもいい。
export const createApplyAndAppliedFriendUser = functions.firestore
  .document(userPath)
  .onUpdate(async (change, context) => {
    const userBeforeSnapShot = await change.before.ref.get()
    const userAfterSnapShot = await change.after.ref.get()
    if (!userBeforeSnapShot.exists || !userAfterSnapShot.exists) {
      throw new Error('not found group')
    }

    const uid = context.params.uid

    const userBefore = buildUser(change.before.id!, change.before.data()!)
    const userAfter = buildUser(change.after.id!, change.after.data()!)

    const db = firestore()
    const batch = db.batch()

    // MEMO: 友達申請したユーザーを保存
    const newApplyFriendUIDs = difference(userAfter.applyFriendUIDs ?? [], userBefore.applyFriendUIDs ?? [])

    const applyFriendUsersRef = db
      .collection('users')
      .doc(uid)
      .collection('applyFriendUsers')

    if (newApplyFriendUIDs.length > 0) {
      const task = newApplyFriendUIDs.map(async applyFriendUID => {
        const applyFriendUserRef = db.collection('users').doc(applyFriendUID)
        const applyFriendUserSnapShot = await applyFriendUserRef.get()
        if (!applyFriendUserSnapShot.exists) return

        const applyFriendUser = buildUser(applyFriendUserSnapShot.id!, applyFriendUserSnapShot.data()!)
        batch.set(
          applyFriendUsersRef.doc(applyFriendUID),
          createDocument<User>({ ...applyFriendUser }),
          { merge: true }
        )
      })

      await Promise.all(task)
    }

    // MEMO: 友達申請されたユーザーを保存
    const newAppliedFriendUIDs = difference(userAfter.appliedFriendUIDs ?? [], userBefore.appliedFriendUIDs ?? [])

    const appliedFriendUsersRef = db
      .collection('users')
      .doc(uid)
      .collection('appliedFriendUsers')

    if (newAppliedFriendUIDs.length > 0) {
      const task = newAppliedFriendUIDs.map(async appliedFriendUID => {
        const appliedFriendUserRef = db.collection('users').doc(appliedFriendUID)
        const appliedFriendUserSnapShot = await appliedFriendUserRef.get()
        if (!appliedFriendUserSnapShot.exists) return

        const appliedFriendUser = buildUser(appliedFriendUserSnapShot.id!, appliedFriendUserSnapShot.data()!)
        batch.set(
          appliedFriendUsersRef.doc(appliedFriendUID),
          createDocument<User>({ ...appliedFriendUser }),
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

    return { message: 'apply and applied friend users are created successfully', contents: [result] }
  })
