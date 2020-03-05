import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, updateDocument, recommendApplyCardPartyID, EntryParty } from '../../entities'

const userPath = 'users/{uid}'

export const entryInitialParties = functions.firestore.document(userPath).onCreate(async (snapshot, _context) => {
  if (!snapshot.exists) {
    throw new Error('not found user')
  }

  const user = buildUser(snapshot.data()!)

  const db = firestore()
  const batch = db.batch()

  const partiesRef = db.collection('parties').doc(recommendApplyCardPartyID) // TODO: 初期参加ラベルを付与し、それで制御
  const partySnapshot = await partiesRef.get()
  const partyRef = partySnapshot.ref

  if (!partySnapshot.exists) {
    return { message: `not exist partyID ${recommendApplyCardPartyID}`, contents: null }
  }

  batch.set(
    partyRef,
    updateDocument<EntryParty>({
      entryUIDs: firestore.FieldValue.arrayUnion(user.uid)
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: user.uid
  }

  return { message: 'entry initial parties is succeded', contents: [result] }
})
