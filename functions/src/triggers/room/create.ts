import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildGroupAsset, createDocument, CreateRoom, buildUser } from '../../entities'

const userPath = 'users/{uid}/matchGroupAssets/{matchGroupAssetID}'

export const createRoom = functions.firestore.document(userPath).onCreate(async (snapshot, context) => {
  if (!snapshot.exists) {
    throw new Error('not found matchGroupAsset')
  }

  const db = firestore()
  const batch = db.batch()

  const groupAsset = buildGroupAsset(snapshot.id, snapshot.data()!)

  const uid = context.params.uid
  const userRef = db.collection('users').doc(uid)
  const userSnapshot = await userRef.get()

  if (!userSnapshot.exists) {
    return { message: `not exists ${uid} user` }
  }

  const me = buildUser(userSnapshot.id, userSnapshot.data()!)

  const roomsRef = db.collection('rooms')
  const roomRef = roomsRef.doc()
  const value: CreateRoom = {
    enabled: true,
    entryUIDs: [me.uid, groupAsset.group.organizerUID],
    users: [me, groupAsset.group.organizer]
  }

  batch.set(
    roomRef,
    createDocument<CreateRoom>(value),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: roomRef.id,
    path: roomRef.path,
    value
  }

  return { message: 'create room', contents: [result] }
})
