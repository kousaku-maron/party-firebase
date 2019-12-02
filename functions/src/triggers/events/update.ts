import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { createDocument, CreateMessage, buildMessageUser, MessageUser } from '../../entities'

const memberPath = 'parties/{partyID}/groups/{groupID}/members/{memberID}'
export const updateEventsLike = functions.firestore.document(memberPath).onUpdate(async (data, context) => {
  const db = firestore()
  const beforeData = data.before.data()
  const afterData = data.after.data()
  if (!beforeData || !afterData) return null
  const partyID = context.params.partyID //beforeData.partyID
  const partyRef = db.collection('parties').doc(partyID)
  const eventRef = partyRef.collection('events')
  //TODO:今後イベントごとに取得するようにする, partyMasterのuid, userは要相談 あとでpartyMasterアカウントを作って入れる
  const eventName = 'nizikai'
  const masterMessage = '２次会に行きたい人が過半数を超えました'
  const eventsSnapShot = await eventRef.where('name', '==', eventName).get()
  const eventIDs = eventsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return doc.id
  })
  if (eventIDs.length < 1) return null
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
    console.log('message', message)

    try {
      await messagesRef.doc().set(createDocument<CreateMessage>(message))
      console.log('message sending scuceeded')
      return { result: true }
    } catch (e) {
      console.warn(e)
      return { result: false }
    }
  }
  /* 暫定masterのID　tYwmmOkToqWSY7Eaq07YadJpngA2　運用時は他のIDにするように気をつける */
  const userRef = db.collection('users')
  const userSnapShot = await userRef.doc('tYwmmOkToqWSY7Eaq07YadJpngA2').get()
  const userData = userSnapShot.data()
  if (!userData) return null
  const user = buildMessageUser(userData)

  const increment = firestore.FieldValue.increment(1)
  const decrement = firestore.FieldValue.increment(-1)
  const likeThreshold = 3
  const eventSnapShot = await eventRef.doc(eventID).get()
  const eventSnapShotData = eventSnapShot.data()
  if (!eventSnapShotData) return null
  const beforelike = eventSnapShotData.like
  const isSentEventMessage = eventSnapShotData.isSentEventMessage

  if (beforeData.isNizikaiLike == true) {
    //eventの数値をデクリメントする
    console.log('non first like and  decrement')
    if (isSentEventMessage == false)
      eventRef.doc(eventID).update({
        like: decrement
      })
  }

  if (beforeData.isNizikaiLike == false) {
    //likeをインクリメントする
    console.log('non first like and  increment')

    //updateで値が+1されるため
    if (likeThreshold <= beforelike + 1 && isSentEventMessage == false) {
      setMessage(partyID, masterMessage, user)
      eventRef.doc(eventID).update({
        like: increment,
        isSentEventMessage: true
      })
    }
  }

  if (beforeData.isNizikaiLike == null && afterData.isNizikaiLike == false) {
    //likeは変えない
    console.log('first like and  unchange')
  }

  if (beforeData.isNizikaiLike == null && afterData.isNizikaiLike == true) {
    //likeをインクリメント
    console.log('first like and  increment')
    //updateで値が+1されるため
    if (likeThreshold <= beforelike + 1 && isSentEventMessage == false) {
      setMessage(partyID, masterMessage, user)
      eventRef.doc(eventID).update({
        like: increment,
        isSentEventMessage: true
      })
    }
  }

  const result = {
    documentID: data.after.ref,
    path: data.after.ref.path,
    value: null
  }

  return { message: 'New User is created successfully', contents: [result] }
})
