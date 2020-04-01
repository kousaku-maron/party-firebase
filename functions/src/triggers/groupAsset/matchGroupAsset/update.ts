import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, buildGroup, UpdateGroupAsset } from '../../../entities'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const updateMatchGroupAsset = functions.firestore.document(groupPath).onUpdate(async (change, _context) => {
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

  const matchGroupAssetsRef = userRef.collection('matchGroupAssets')
  const matchGroupAssetRef = matchGroupAssetsRef.where('groupID', '==', groupID)
  const matchGroupAssetsSnapShot = await matchGroupAssetRef.get()

  if (matchGroupAssetsSnapShot.docs.length !== 1) {
    throw new Error('groupAsset is not singular')
  }
  const matchGrpupAssetID = matchGroupAssetsSnapShot.docs[0].id

  batch.set(
    matchGroupAssetsRef.doc(matchGrpupAssetID),
    updateDocument<UpdateGroupAsset>({ group }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: uid,
    path: userRef.path,
    value: group
  }

  return { message: 'matchGroupAsset is deleted successfully', contents: [result] }
})
