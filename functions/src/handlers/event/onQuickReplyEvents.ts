import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateEvent, EventTypes, buildEvent, EventReply } from '../../entities'
import { Reply } from 'react-native-gifted-chat'

export const onQuickReplyEvents = functions.https.onCall(async (data, context) => {
  const roomID = data.roomID as string
  const eventType = data.eventType as EventTypes
  const replies = data.quickReplies as Reply[]
  const replyType = data.replyType as 'negative' | 'positive' // 暫定
  const gender = data.gender as 'male' | 'female' // TODO: userデータfetchして判定させる。

  const db = firestore()
  const batch = db.batch()
  const uid = context!.auth!.uid

  const partyRef = db.collection('parties').doc(roomID)
  const eventRef = partyRef.collection('events')
  //TODO:今後イベントごとに取得するようにする, partyMasterのuid, userは要相談 あとでpartyMasterアカウントを作って入れる
  const eventsSnapShot = await eventRef.where('name', '==', eventType).get()
  const eventIDs = eventsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return doc.id
  })

  if (eventIDs.length !== 1) throw new Error('eventIDs contains multiple elements')
  const eventID = eventIDs[0] as string

  const eventSnapShot = await eventRef.doc(eventID).get()
  if (!eventSnapShot.exists) throw new Error('not found eventSnapShotData')

  const event = buildEvent(eventSnapShot.data()!)

  if (event.repliedUIDs.includes(uid)) {
    return {
      message: 'You have already quick replied.',
      contents: [
        {
          documentID: partyRef.id,
          path: partyRef.path,
          value: false
        }
      ]
    }
  }

  const storeEventReply: EventReply = {
    gender,
    replies,
    positiveCount: replyType === 'positive' ? 1 : 0,
    negativeCount: replyType === 'negative' ? 1 : 0
  }

  if (replyType === 'negative') {
    await batch.set(
      eventRef.doc(eventID),
      updateDocument<UpdateEvent>({
        negativeReplies: firestore.FieldValue.arrayUnion(storeEventReply),
        repliedUIDs: firestore.FieldValue.arrayUnion(uid)
      })
    )
  }

  if (replyType === 'positive') {
    await batch.set(
      eventRef.doc(eventID),
      updateDocument<UpdateEvent>({
        positiveReplies: firestore.FieldValue.arrayUnion(storeEventReply),
        repliedUIDs: firestore.FieldValue.arrayUnion(uid)
      })
    )
  }

  await batch.commit()

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: true
  }

  return { message: 'reply event successfully', contents: [result] }
})
