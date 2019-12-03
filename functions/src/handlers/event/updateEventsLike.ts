import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, Event, nizikai } from '../../entities'

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

  if (eventIDs.length !== 1) return null
  const eventID = eventIDs[0] as string

  /* 暫定masterをentitiesから呼び出す */
  const eventSnapShot = await eventRef.doc(eventID).get()
  const eventSnapShotData = eventSnapShot.data()
  if (!eventSnapShotData) throw new Error('not found eventSnapShotData')
  const increment = firestore.FieldValue.increment(eventSnapShotData.increment as number)
  const decrement = firestore.FieldValue.increment(eventSnapShotData.decrement as number)
  if (eventSnapShotData.likedUid.includes(uid) === true)
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

  if (data.eventLike === false) {
    console.log('decrement')
    await batch.update(
      eventRef.doc(eventID),
      updateDocument<Event>({
        like: decrement,
        likedUid: firestore.FieldValue.arrayUnion(uid)
      })
    )
  }
  if (data.eventLike === true) {
    console.log('increment')
    await batch.update(
      eventRef.doc(eventID),
      updateDocument<Event>({
        like: increment,
        likedUid: firestore.FieldValue.arrayUnion(uid)
      })
    )
  }

  await batch.commit()

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: true
  }

  return { message: 'Update EventsLike successfully', contents: [result] }
})
