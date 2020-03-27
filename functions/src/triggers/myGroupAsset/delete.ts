import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, buildGroup, UpdateUser } from '../../entities'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const deleteMyGroupAsset = functions.firestore.document(groupPath).onDelete(async (snapshot, _context) => {
  const groupDeletedSnapShot = await snapshot.ref.get()

  if (groupDeletedSnapShot.exists) {
    throw new Error('still exists group')
  }

  const group = buildGroup(snapshot.id, snapshot.data()!)
  const groupID = group.id

  const db = firestore()
  const batch = db.batch()

  const uid = group.organizerUID
  const userRef = db.collection('users').doc(uid)

  const myGroupAssetsRef = userRef.collection('myGroupAssets')
  const myGroupAssetRef = myGroupAssetsRef.where('groupID', '==', groupID)
  const myGroupAssetsSnapShot = await myGroupAssetRef.get()

  if (myGroupAssetsSnapShot.docs.length !== 1) return
  const myGrpupAssetID = myGroupAssetsSnapShot.docs[0].id

  batch.delete(myGroupAssetsSnapShot.docs[0].ref)

  batch.set(
    myGroupAssetsRef.doc(myGrpupAssetID),
    updateDocument<UpdateUser>({ myGroupAssetIDs: firestore.FieldValue.arrayRemove(groupID) }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: uid,
    path: userRef.path,
    value: myGrpupAssetID
  }

  return { message: 'myGroupAsset is deleted successfully', contents: [result] }
})
