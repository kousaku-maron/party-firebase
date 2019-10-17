import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { FieldValue } from '@google-cloud/firestore'

export const updateUserID = functions.https.onCall(async (data, context) => {
  const userID = data.userID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')
  const snapshot = await usersRef.where("userID", "==", userID).get()

  if(snapshot.docs.length > 0) {
    return { message: `already exist your userID ${userID}`, contents: null }
  }

  const userRef = db.collection('users').doc(uid)

  batch.set(userRef, {
    userID,
    updatedAt: FieldValue.serverTimestamp()
  })

  await batch.commit()

  const result = {
    documentID: userRef.id,
    path: userRef.path,
    value: userID
  }

  return { message: 'update userID is succeded', contents: [result] }
})
