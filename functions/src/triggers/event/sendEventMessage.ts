import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateMessage, partyMaster, createDocument, nizikai } from '../../entities'

const eventPath = 'parties/{partyID}/events/{eventID}'
export const sendEventMessage = functions.firestore.document(eventPath).onUpdate(async (change, context) => {
  const db = firestore()
  const batch = db.batch()
  const partyID = context.params.partyID

  const beforeData = change.before.data()
  const afterData = change.after.data()
  if (!beforeData) throw new Error('not found beforeData')
  if (!afterData) throw new Error('not found afterData')
  const likeThreshold = beforeData.likeThreshold
  const beforeLike = beforeData.like
  const afterLike = afterData.like
  if (afterLike < likeThreshold || afterLike < beforeLike || beforeData.isSentEventMessage === true) return null

  const roomsRef = db.collection('parties')
  const getMessagesRef = (partyID: string) => {
    return roomsRef.doc(partyID).collection('messages')
  }

  const messagesRef = getMessagesRef(partyID)

  const message: CreateMessage = {
    text: nizikai.masterMessage,
    user: partyMaster,
    writerUID: partyMaster.uid,
    system: false
  }
  try {
    await batch.set(messagesRef.doc(), createDocument<CreateMessage>(message), { merge: true })
    console.log('Sending message is scuceeded')
  } catch (e) {
    console.warn(e)
  }
  await batch.update(change.after.ref, { isSentEventMessage: true })

  await batch.commit()
  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: afterData
  }

  return { message: 'Sending event message is succeded', contents: [result] }
})
