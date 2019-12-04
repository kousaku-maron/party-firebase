import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  CreateMessage,
  partyMaster,
  createDocument,
  buildEvent /*, EventTypeMessages */,
  nizikai
} from '../../entities'

const eventPath = 'parties/{partyID}/events/{eventID}'
export const sendEventMessage = functions.firestore.document(eventPath).onUpdate(async (change, context) => {
  const db = firestore()
  const batch = db.batch()
  const partyID = context.params.partyID

  const event = buildEvent(change.after.data()!)
  if (!event.isSentEventMessage && event.positiveReplies.length >= event.threshold) {
    // const roomsRef = db.collection('parties')
    // const messagesRef = roomsRef.doc(partyID).collection('messages')
    // const message: CreateMessage = {
    //   text: EventTypeMessages[event.name!] && '？？？',
    //   user: partyMaster,
    //   writerUID: partyMaster.uid,
    //   system: true
    // }
  }

  const roomsRef = db.collection('parties')
  const messagesRef = roomsRef.doc(partyID).collection('messages')
  const message: CreateMessage = {
    text: nizikai.masterMessage,
    user: partyMaster,
    writerUID: partyMaster.uid,
    system: true
  }

  try {
    await batch.set(messagesRef.doc(), createDocument<CreateMessage>(message), { merge: true })
  } catch (e) {
    console.warn(e)
  }
  await batch.commit()
  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: event
  }

  return { message: 'Sending event message is succeded', contents: [result] }
})
