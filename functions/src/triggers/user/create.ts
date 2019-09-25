import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { FieldValue } from '@google-cloud/firestore'
import { initialUser } from '../../entities'

export const createUser = functions.auth.user().onCreate(async user => {
  const uid = user.uid
  const name = user.displayName
  if (!uid) throw new Error('not found uid')

  const newUser = initialUser({ uid, name })

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users').doc(uid)

  batch.set(userRef, {
    enabled: newUser.enabled,
    uid: newUser.uid,
    name: newUser.name,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  })

  await batch.commit()

  const result = {
    documentID: userRef.id,
    path: userRef.path,
    value: user
  }

  return { message: 'New User is created successfully', contents: [result] }
})
