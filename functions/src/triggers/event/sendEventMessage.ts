import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  CreateMessage,
  partyMaster,
  createDocument,
  buildEvent,
  EventTypeMessages,
  EventTypes,
  updateDocument,
  UpdateEvent
} from '../../entities'

const eventPath = 'parties/{partyID}/events/{eventID}'
export const sendEventMessage = functions.firestore.document(eventPath).onUpdate(async (change, context) => {
  const db = firestore()
  const batch = db.batch()
  const partyID = context.params.partyID

  const event = buildEvent(change.after.data()!)

  const femalePositiveCount = event.positiveReplies
    .filter(eventReply => eventReply.gender === 'female')
    .map(eventReply => eventReply.count)
    .reduce((acc, value) => acc + value)

  const malePositiveCount = event.positiveReplies
    .filter(eventReply => eventReply.gender === 'male')
    .map(eventReply => eventReply.count)
    .reduce((acc, value) => acc + value)

  if (!event.isSentEventMessage && femalePositiveCount >= event.threshold && malePositiveCount >= event.threshold) {
    const roomsRef = db.collection('parties')
    const messagesRef = roomsRef.doc(partyID).collection('messages')
    const message: CreateMessage = {
      text: EventTypeMessages[event.name as EventTypes] && '???',
      user: partyMaster,
      writerUID: partyMaster.uid,
      system: true
    }

    try {
      batch.set(messagesRef.doc(), createDocument<CreateMessage>(message), { merge: true })
      batch.set(change.after.ref, updateDocument<UpdateEvent>({ isSentEventMessage: true }), { merge: true })
    } catch (e) {
      console.warn(e)
    }
    await batch.commit()
  }

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: event
  }

  return { message: 'Sending event message is succeded', contents: [result] }
})
