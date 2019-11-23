import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { FieldValue } from '@google-cloud/firestore'
import { initialUser, ANONYMOUS_USERNAME } from '../../entities'
import { getRandomID } from '../../services/util'

export const createUser = functions.auth.user().onCreate(async user => {
  const uid = user.uid
  const isAnonymous = user.providerData.length === 0 // MEMO: 匿名認証時は空になっているぽい。
  const name = user.displayName ? user.displayName : ANONYMOUS_USERNAME

  if (!uid) throw new Error('not found uid')

  const userID = getRandomID()
  const newUser = initialUser({ uid, userID, name, isAnonymous })

  const db = firestore()
  const batch = db.batch()

  const userRef = db.collection('users').doc(uid)

  batch.set(userRef, {
    enabled: newUser.enabled,
    isAccepted: newUser.isAccepted,
    isAnonymous: newUser.isAnonymous,
    uid: newUser.uid,
    userID: newUser.userID,
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
