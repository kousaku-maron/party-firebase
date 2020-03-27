import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, buildGroup, UpdateUser, createDocument, CreateGroupAsset } from '../../entities'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const createMyGroupAsset = functions.firestore.document(groupPath).onCreate(async (snapshot, _context) => {
  if (!snapshot.data()) {
    throw new Error('not found new group')
  }

  const group = buildGroup(snapshot.id, snapshot.data()!)
  const groupID = group.id

  const db = firestore()
  const batch = db.batch()

  const uid = group.organizerUID
  const userRef = db.collection('users').doc(uid)

  batch.set(
    userRef,
    updateDocument<UpdateUser>({ myGroupAssetIDs: firestore.FieldValue.arrayUnion(groupID) }),
    { merge: true }
  )

  const myGroupAssetRef = userRef.collection('myGroupAssets').doc(groupID)
  batch.set(
    myGroupAssetRef,
    createDocument<CreateGroupAsset>({
      groupID,
      group,
      enabled: true
    })
  )

  await batch.commit()

  const result = {
    documentID: uid,
    path: userRef.path,
    value: groupID
  }

  return { message: 'myGroupAsset is created successfully', contents: [result] }
})
