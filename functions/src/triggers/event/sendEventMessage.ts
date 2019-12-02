import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateMessage, MessageUser, partyMaster, createDocument, nizikai } from '../../entities'

const eventPath = 'parties/{partyID}/events/{eventID}'
export const sendEventMessage = functions.firestore.document(eventPath).onUpdate(async (change, context) => {
  const partyID = context.params.partyID
  const beforeData = change.before.data()
  const db = firestore()

  if (!beforeData) return null
  const likeThreshold = beforeData.likeThreshold
  const beforeLike = beforeData.like
  if (likeThreshold > beforeLike + 1) return null

  const roomsRef = db.collection('parties')
  const getMessagesRef = (partyID: string) => {
    return roomsRef.doc(partyID).collection('messages')
  }

  const setMessage = async (partyID: string, messageText: string, user: MessageUser) => {
    const messagesRef = getMessagesRef(partyID)

    const message: CreateMessage = {
      text: messageText,
      user,
      writerUID: user.uid,
      system: false
    }
    try {
      await messagesRef.doc().set(createDocument<CreateMessage>(message), { merge: true })
      console.log('Sending message is scuceeded')
      return { result: true }
    } catch (e) {
      console.warn(e)
      return { result: false }
    }
  }
  setMessage(partyID, nizikai.masterMessage, partyMaster)

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: nizikai.masterMessage
  }

  return { message: 'Sending event message is succeded', contents: [result] }
})
