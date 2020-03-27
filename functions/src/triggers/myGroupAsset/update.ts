import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, buildGroup, UpdateMyGroupAsset } from '../../entities'

const groupPath = 'parties/{partyID}/groups'

export const updateMyGroupAsset = functions.firestore.document(groupPath).onUpdate(async (change, _context) => {
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

  const myGroupAssetRef = userRef.collection('myGroupAssets').where('groupID', '==', groupID)
  const myGroupAssetsSnapShot = await myGroupAssetRef.get()

  if (myGroupAssetsSnapShot.docs.length !== 1) return

  batch.set(
    userRef,
    updateDocument<UpdateMyGroupAsset>({ group })
  )

  await batch.commit()

  const result = {
    documentID: uid,
    path: userRef.path,
    value: groupID
  }

  return { message: 'myGroupAsset is deleted successfully', contents: [result] }
})
