import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildGroupAsset, createDocument, CreateRoom, buildUser } from '../../entities'
import { createListHash } from '../../services/util'

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

  const newRoomHash = createListHash([me.uid, groupAsset.group.organizerUID])

  const roomsRef = db.collection('rooms')
  const roomsSnapshot = await roomsRef.where('roomHash', '==', newRoomHash).get()

  if (roomsSnapshot.docs.length > 0) {
    return { message: `already created ${newRoomHash} room` }
  }

  const roomRef = roomsRef.doc()

  batch.set(
    roomRef,
    createDocument<CreateRoom>({
      enabled: true,
      roomHash: newRoomHash,
      entryUIDs: [me.uid, groupAsset.group.organizerUID],
      users: [me, groupAsset.group.organizer]
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: roomRef.id,
    path: roomRef.path,
    value: newRoomHash
  }

  return { message: 'create room', contents: [result] }
})
