import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, buildGroup, UpdateGroupAsset } from '../../../entities'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const updateLikeGroupAsset = functions.firestore.document(groupPath).onUpdate(async (change, _context) => {
  const groupSnapShot = await change.after.ref.get()

  if (!groupSnapShot.exists) {
    throw new Error('not found group')
  }
  const group = buildGroup(groupSnapShot.id, groupSnapShot.data()!)
  const groupID = group.id

  const db = firestore()
  const batch = db.batch()

  const uid = group.organizerUID
  const userRef = db.collection('users').doc(uid)

  const likeGroupAssetsRef = userRef.collection('likeGroupAssets')
  const likeGroupAssetRef = likeGroupAssetsRef.where('groupID', '==', groupID)
  const likeGroupAssetsSnapShot = await likeGroupAssetRef.get()

  if (likeGroupAssetsSnapShot.docs.length !== 1) {
    throw new Error('groupAsset is not singular')
  }
  const likeGrpupAssetID = likeGroupAssetsSnapShot.docs[0].id

  batch.set(
    likeGroupAssetsRef.doc(likeGrpupAssetID),
    updateDocument<UpdateGroupAsset>({ group }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: uid,
    path: userRef.path,
    value: group
  }

  return { message: 'likeGroupAsset is deleted successfully', contents: [result] }
})
