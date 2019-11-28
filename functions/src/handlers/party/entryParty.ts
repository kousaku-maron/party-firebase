import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, EntryParty, buildParty } from '../../entities'
import { isEmpty, uniq } from 'lodash'

export const entryParty = functions.https.onCall(async (data, context) => {
  const partyID = data.partyID as string
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const partyRef = db.collection('parties').doc(partyID)
  const snapshot = await partyRef.get()

  if (!snapshot.exists) {
    return { message: `not exist partyID ${partyID}`, contents: null }
  }

  const party = buildParty(snapshot.data()!)

  batch.set(
    partyRef,
    updateDocument<EntryParty>({
      entryUIDs: isEmpty(party.entryUIDs) ? [uid] : uniq([...party.entryUIDs, uid])
    }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    documentID: partyRef.id,
    path: partyRef.path,
    value: partyID
  }

  return { message: 'entry party is succeded', contents: [result] }
})
