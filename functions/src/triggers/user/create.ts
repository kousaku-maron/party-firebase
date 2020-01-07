import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { User, initialUser, ANONYMOUS_USERNAME, Secure, createDocument } from '../../entities'
import { getRandomID } from '../../services/util'

export const createUser = functions.auth.user().onCreate(async user => {
  const uid = user.uid
  const isAnonymous = user.providerData.length === 0 // MEMO: 匿名認証時は空になっているぽい。
  const name = user.displayName ? user.displayName : ANONYMOUS_USERNAME

  if (!uid) {
    throw new Error('not found uid')
  }

  const db = firestore()

  const userRef = db.collection('users').doc(uid)
  const userSnapshot = await userRef.get()
  if (userSnapshot.exists) {
    return { message: `already create ${uid} user` }
  }

  const userID = getRandomID()
  const newUser = initialUser({ uid, userID, name, isAnonymous })
  
  const batch = db.batch()

  batch.set(
    userRef,
    createDocument<User>({
      enabled: newUser.enabled,
      isAccepted: newUser.isAccepted,
      isAnonymous: newUser.isAnonymous,
      uid: newUser.uid,
      userID: newUser.userID,
      name: newUser.name
    })
  )

  const secureRef = userRef.collection('options').doc('secure')
  batch.set(secureRef, createDocument<Secure>({}))

  await batch.commit()

  const result = {
    documentID: userRef.id,
    path: userRef.path,
    value: user
  }

  return { message: 'New User is created successfully', contents: [result] }
})
