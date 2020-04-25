import * as functions from 'firebase-functions'
import { firestore, messaging } from 'firebase-admin'
import { buildMessage, buildRoom, updateDocument, UpdateMessage, buildPushToken } from '../../entities'
import { uniq } from 'lodash'

const messagePath = 'rooms/{roomID}/messages/{messageID}'

export const pushFcmMessage = functions.firestore.document(messagePath).onCreate(async (snap, context) => {
  if (!snap.exists) {
    return { message: `not exist message`, contents: null }
  }

  const roomID = context.params.roomID
  // const messageID = context.params.messageID

  const messageSnapshot = await snap.ref.get()
  if (!messageSnapshot.exists) {
    return { message: `not exists message` }
  }
  const message = buildMessage(messageSnapshot.id, messageSnapshot.data()!)
  if (message.notified) {
    return { message: 'already send push notification.' }
  }

  const db = firestore()

  const roomRef = db.collection('rooms').doc(roomID)
  const roomSnapshot = await roomRef.get()

  if (!roomSnapshot.exists) {
    return { message: `not exists ${roomID} room` }
  }

  const room = buildRoom(roomSnapshot.id, roomSnapshot.data()!)
  const entryUIDs: string[] = room.entryUIDs || []

  const collectTokenTask = entryUIDs
    .filter(uid => uid !== message.writerUID)
    .map(async uid => {
      const pushTokensRef = db
        .collection('users')
        .doc(uid)
        .collection('pushTokens')

      const snapShot = await pushTokensRef.get()
      if (!snapShot.empty) {
        return []
      }

      const tokens = snapShot.docs.map(doc => buildPushToken(doc.id, doc.data()).token)
      return tokens
    })

  const tokens = uniq((await Promise.all(collectTokenTask)).reduce((prev, crt) => [...prev, ...crt]))

  const pushMessage: messaging.MulticastMessage = {
    notification: {
      title: message.user?.name || '',
      body: message.text
    },
    tokens
  }

  await messaging().sendMulticast(pushMessage)

  const batch = db.batch()

  batch.set(
    messageSnapshot.ref,
    updateDocument<UpdateMessage>({ notified: true }),
    { merge: true }
  )

  const result = {
    documentID: snap.ref,
    path: snap.ref.path,
    value: message
  }

  return { message: 'push message notifications is succeded', contents: [result] }
})
