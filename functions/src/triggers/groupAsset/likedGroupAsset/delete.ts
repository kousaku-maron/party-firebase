import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser } from '../../../entities'
import { difference } from 'lodash'

const userPath = 'users/{userID}'

export const deleteLikedGroupAsset = functions.firestore.document(userPath).onUpdate(async (change, _context) => {
  const userBeforeSnapShot = await change.before.ref.get()
  const userAfterSnapShot = await change.after.ref.get()
  if (!userBeforeSnapShot.exists || !userAfterSnapShot.exists) {
    throw new Error('not found user')
  }

  const userBefore = buildUser(change.before.id!, change.before.data()!)
  const userAfter = buildUser(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const removedGroupAssetIDs = difference(userBefore.likedGroupAssetIDs ?? [], userAfter.likedGroupAssetIDs ?? [])

  if (removedGroupAssetIDs.length === 0) {
    return { message: 'There are no new likedGroupAssetID to delete.', contents: null }
  }

  const task = removedGroupAssetIDs.map(async removedGroupAssetID => {
    const groupAssetsRef = change.after.ref.collection('likedGroupAssets')
    const groupAssetSnapShot = await groupAssetsRef.where('groupID', '==', removedGroupAssetID).get()

    if (groupAssetSnapShot.docs.length !== 1) {
      throw new Error('groupAsset is not unique')
    }

    batch.delete(groupAssetSnapShot.docs[0].ref)
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: { userAfter }
  }
  return { message: 'likedGroupAsset is created successfully', contents: [result] }
})
