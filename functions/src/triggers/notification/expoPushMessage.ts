import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import { buildMessage, buildRoom, buildSecure, updateDocument, UpdateMessage } from '../../entities'

const expo = new Expo()
const messagePath = 'rooms/{roomID}/messages/{messageID}'

export const createMessage = functions.firestore.document(messagePath).onCreate(async (snap, context) => {
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

  // TODO: immutableな書き方にしたい。
  const tokens: string[] = []
  const collectTokenTask = entryUIDs.map(async uid => {
    const secureRef = db
      .collection('users')
      .doc(uid)
      .collection('options')
      .doc('secure')

    const secureSnapshot = await secureRef.get()

    if (!secureSnapshot.exists) return

    const secure = buildSecure(secureSnapshot.id, secureSnapshot.data()!)
    if (secure.pushTokens) {
      tokens.push(...secure.pushTokens)
    }

    return
  })

  await Promise.all(collectTokenTask)

  const expoPushMessages: ExpoPushMessage[] = tokens
    .filter(token => Expo.isExpoPushToken(token))
    .map(token => ({
      to: token,
      sound: 'default',
      body: message.user ? `${message.user.name}: ${message.text}` : message.text,
      data: { withSome: 'data' }
    }))

  const chunks = expo.chunkPushNotifications(expoPushMessages)

  const pushNotificationTask = chunks.map(async chunk => {
    try {
      await expo.sendPushNotificationsAsync(chunk)
      return
    } catch (e) {
      return { error: e }
    }
  })

  await Promise.all(pushNotificationTask)

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
