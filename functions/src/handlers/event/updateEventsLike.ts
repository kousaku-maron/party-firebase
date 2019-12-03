import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateEvent, nizikai } from '../../entities'

export const updateEventsLike = functions.https.onCall(async (data, context) => {
  const db = firestore()
  const batch = db.batch()
  const uid = context!.auth!.uid

  const roomID = data.roomID as string
  const partyRef = db.collection('parties').doc(roomID)
  const eventRef = partyRef.collection('events')
  //TODO:今後イベントごとに取得するようにする, partyMasterのuid, userは要相談 あとでpartyMasterアカウントを作って入れる
  const eventsSnapShot = await eventRef.where('name', '==', nizikai.eventName).get()
  const eventIDs = eventsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return doc.id
  })

  if (eventIDs.length !== 1) throw new Error('neventIDs contains multiple elements')
  const eventID = eventIDs[0] as string

  const eventSnapShot = await eventRef.doc(eventID).get()
  if (!eventSnapShot.exists) throw new Error('not found eventSnapShotData')

  const eventSnapShotData = eventSnapShot.data() as firestore.DocumentData
  const increment = firestore.FieldValue.increment(1)
  const decrement = firestore.FieldValue.increment(-1)

  if (eventSnapShotData.likedUIDs.includes(uid))
    return {
      message: 'You have already liked',
      contents: [
        {
          documentID: partyRef.id,
          path: partyRef.path,
          value: false
        }
      ]
    }

  await batch.update(
    eventRef.doc(eventID),
    updateDocument<UpdateEvent>({
      like: data.eventLike ? increment : decrement,
      likedUIDs: firestore.FieldValue.arrayUnion(uid),
      isSentEventMessage: true
    })
  )
  await batch.commit()

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: true
  }

  return { message: 'Update EventsLike successfully', contents: [result] }
})
