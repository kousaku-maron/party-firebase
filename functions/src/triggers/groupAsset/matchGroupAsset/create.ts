import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateGroupAsset, createDocument, buildUser, buildGroupAsset } from '../../../entities'
import { difference } from 'lodash'

const userPath = 'users/{userID}'

export const createMatchGroupAsset = functions.firestore.document(userPath).onUpdate(async (change, _context) => {
  const userBeforeSnapShot = await change.before.ref.get()
  const userAfterSnapShot = await change.after.ref.get()
  if (!userBeforeSnapShot.exists || !userAfterSnapShot.exists) {
    throw new Error('not found user')
  }

  const userBefore = buildUser(change.before.id!, change.before.data()!)
  const userAfter = buildUser(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const newGroupAssetIDs = difference(userAfter.matchGroupAssetIDs ?? [], userBefore.matchGroupAssetIDs ?? [])

  if (newGroupAssetIDs.length === 0) {
    return { message: 'There are no new matchGroupAssetID to create.', contents: null }
  }

  const task = newGroupAssetIDs.map(async newGroupAssetID => {
    const groupAssetSnapShot = await db
      .collectionGroup('myGroupAssets')
      .where('groupID', '==', newGroupAssetID)
      .get()

    if (groupAssetSnapShot.docs.length !== 1) {
      throw new Error('groupAsset is not unique')
    }

    const groupAsset = buildGroupAsset(groupAssetSnapShot.docs[0].id, groupAssetSnapShot.docs[0].data())

    batch.set(
      change.after.ref.collection('matchGroupAssets').doc(),
      createDocument<CreateGroupAsset>({
        groupID: groupAsset.group.id,
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
    value: { userAfter }
  }
  return { message: 'matchGroupAsset is created successfully', contents: [result] }
})
