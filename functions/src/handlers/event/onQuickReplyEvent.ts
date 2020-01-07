import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  updateDocument,
  UpdateEvent,
  ReplyType,
  EventType,
  buildEvent,
  EventReply,
  GiftedChatReply
} from '../../entities'

export const onQuickReplyEvent = functions.https.onCall(async (data, context) => {
  const roomID = data.roomID as string
  const eventType = data.eventType as EventType
  const replies = data.replies as GiftedChatReply[]
  const replyType = data.replyType as ReplyType
  const gender = data.gender as 'male' | 'female' // TODO: userデータfetchして判定させる。

  const db = firestore()
  const batch = db.batch()
  const uid = context!.auth!.uid

  const roomRef = db.collection('rooms').doc(roomID)
  const eventRef = roomRef.collection('events')

  //TODO: 今後イベントごとに取得するようにする, partyMasterのuid, userは要相談 あとでpartyMasterアカウントを作って入れる
  const eventsSnapShot = await eventRef.where('name', '==', eventType).get()
  const eventIDs = eventsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return doc.id
  })

  if (eventIDs.length !== 1) {
    throw new Error('eventIDs contains multiple elements')
  }

  const eventID = eventIDs[0] as string
  const eventSnapShot = await eventRef.doc(eventID).get()
  if (!eventSnapShot.exists) {
    throw new Error('not found event')
  }

  const event = buildEvent(eventSnapShot.data()!)

  if (event.repliedUIDs.includes(uid)) {
    return {
      message: 'You have already quick replied.',
      contents: [
        {
          documentID: roomRef.id,
          path: roomRef.path,
          value: false
        }
      ]
    }
  }

  const storeEventReply: EventReply = {
    repliedUID: uid,
    gender,
    replies,
    count: 1
  }

  batch.set(
    eventRef.doc(eventID),
    updateDocument<UpdateEvent>({
      ...(replyType === 'negative' && { negativeReplies: firestore.FieldValue.arrayUnion(storeEventReply) }),
      ...(replyType === 'positive' && { positiveReplies: firestore.FieldValue.arrayUnion(storeEventReply) }),
      repliedUIDs: firestore.FieldValue.arrayUnion(uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: roomRef.id,
    path: roomRef.path,
    value: true
  }

  return { message: 'reply event successfully', contents: [result] }
})
