import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateGroupAsset, createDocument, buildUser, buildGroupAsset } from '../../entities'
import { difference } from 'lodash'

const userPath = 'users/{userID}'

export const create = functions.firestore.document(userPath).onUpdate(async (change, _context) => {
  const userBeforeSnapShot = await change.before.ref.get()
  const userAfterSnapShot = await change.after.ref.get()
  if (!userBeforeSnapShot.exists || !userAfterSnapShot.exists) {
    throw new Error('not found user')
  }

  const userBefore = buildUser(change.before.id!, change.before.data()!)
  const userAfter = buildUser(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const newGroupAssetIDs = difference(userAfter.likedGroupAssetIDs ?? [], userBefore.likedGroupAssetIDs ?? [])

  if (newGroupAssetIDs.length === 0) {
    return { message: 'There are no new likedGroupAssetID to create.', contents: null }
  }

  const task = newGroupAssetIDs.map(async groupAssetID => {
    const groupAssetSnapShot = await db
      .collectionGroup('myGroupAssets')
      .where('organizerUID', '==', groupAssetID)
      .get()
    if (groupAssetSnapShot.docs.length !== 0) {
      throw new Error('groupAsset is not unique')
    }

    const groupAsset = buildGroupAsset(groupAssetSnapShot.docs[0].id, groupAssetSnapShot.docs[0].data())

    batch.set(
      change.after.ref.collection('likedGroupAsset').doc(),
      createDocument<CreateGroupAsset>({
        groupID: groupAsset.id,
        enabled: groupAsset.enabled,
        group: groupAsset.group
      }),
      { merge: true }
    )
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: { ...newGroupAssetIDs }
  }
  return { message: 'likedGroupAsset is created successfully', contents: [result] }
})
