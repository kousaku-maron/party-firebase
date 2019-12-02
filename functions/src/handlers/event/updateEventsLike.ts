import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { CreateMessage, buildMessageUser, MessageUser, partyMaster, createDocument } from '../../entities'

export const updateEventsLike = functions.https.onCall(async data => {
  const db = firestore()
  const partyID = data.partyID as string
  const partyRef = db.collection('parties').doc(partyID)
  const eventRef = partyRef.collection('events')
  //TODO:今後イベントごとに取得するようにする, partyMasterのuid, userは要相談 あとでpartyMasterアカウントを作って入れる
  const eventName = 'nizikai'
  const masterMessage = '２次会に行きたい人が過半数を超えました'
  const eventsSnapShot = await eventRef.where('name', '==', eventName).get()
  const eventIDs = eventsSnapShot.docs.map((doc: firestore.DocumentData) => {
    try {
      return doc.id
    } catch (e) {
      return { error: e }
    }
  })
  if (eventIDs.length !== 1) return null
  const eventID = eventIDs[0]

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
      await messagesRef.doc().set(createDocument<CreateMessage>(message))
      console.log('Sending message is scuceeded')
      return { result: true }
    } catch (e) {
      console.warn(e)
      return { result: false }
    }
  }
  /* 暫定masterをentitiesから呼び出す */
  const user = buildMessageUser(partyMaster)
  const eventSnapShot = await eventRef.doc(eventID).get()
  const eventSnapShotData = eventSnapShot.data()
  if (!eventSnapShotData) return null
  const beforelike = eventSnapShotData.like
  const isSentEventMessage = eventSnapShotData.isSentEventMessage
  const increment = firestore.FieldValue.increment(eventSnapShotData.increment)
  const decrement = firestore.FieldValue.increment(eventSnapShotData.decrement)
  const likeThreshold = eventSnapShotData.likeThreshold

  if (data.isNizikaiLike === false) {
    console.log('decrement')
    eventRef.doc(eventID).update({
      like: decrement
    })
  }
  if (data.isNizikaiLike === true) {
    console.log('increment')
    eventRef.doc(eventID).update({
      like: increment
    })
  }
  if (likeThreshold <= beforelike + 1 && isSentEventMessage === false) {
    setMessage(partyID, masterMessage, user)
  }

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: null
  }

  return { message: 'Update EventsLike successfully', contents: [result] }
})
