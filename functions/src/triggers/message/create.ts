import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import { buildMessage, buildParty, buildSecure } from '../../entities'

const expo = new Expo()
const messagePath = 'parties/{partyID}/messages/{messageID}'

export const createMessage = functions.firestore.document(messagePath).onCreate(async (snap, context) => {
  if (!snap.exists) {
    return { message: `not exist message`, contents: null }
  }

  const partyID = context.params.partyID
  // const messageID = context.params.messageID

  const message = buildMessage(snap.data()!)

  const db = firestore()

  const partyRef = db.collection('parties').doc(partyID)
  const partySnapshot = await partyRef.get()

  if (!partySnapshot.exists) {
    return { message: `not exits ${partyID} party` }
  }

  const party = buildParty(partySnapshot.data()!)
  const entryUIDs: string[] = party.entryUIDs || []

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

    const secure = buildSecure(secureSnapshot.data()!)
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

  const result = {
    documentID: snap.ref,
    path: snap.ref.path,
    value: message
  }

  return { message: 'push message notifications is succeded', contents: [result] }
})
