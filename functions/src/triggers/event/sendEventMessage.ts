import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateMessage, partyMaster, createDocument, nizikai, buildEvent } from '../../entities'

const eventPath = 'parties/{partyID}/events/{eventID}'
export const sendEventMessage = functions.firestore.document(eventPath).onUpdate(async (change, context) => {
  const db = firestore()
  const batch = db.batch()
  const partyID = context.params.partyID

  const afterData = buildEvent(change.after.data() as firestore.DocumentData)
  if (afterData.like < afterData.likeThreshold || !afterData.isSentEventMessage) {
    return { message: ` Sending event message terms are not satisfied`, contents: null }
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
    value: afterData
  }

  return { message: 'Sending event message is succeded', contents: [result] }
})
