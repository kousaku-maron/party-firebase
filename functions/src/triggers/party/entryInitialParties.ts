import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildUser, updateDocument, recommendApplyCardTags, EntryParty } from '../../entities'

const userPath = 'users/{uid}'

export const entryInitialParties = functions.firestore.document(userPath).onCreate(async (snapshot, _context) => {
  if (!snapshot.exists) {
    throw new Error('not found user')
  }

  const user = buildUser(snapshot.id, snapshot.data()!)

  const db = firestore()
  const batch = db.batch()

  const partiesRef = db.collection('parties') // TODO: 初期参加ラベルを付与し、それで制御
  const tagedPartyRef = partiesRef
    .where('enabled', '==', true)
    .where('tags', 'array-contains-any', recommendApplyCardTags)

  const partySnapShot = await tagedPartyRef.get()

  if (partySnapShot.docs.length == 0) {
    return { message: `not exist party whose tag is ${recommendApplyCardTags}`, contents: null }
  }

  partySnapShot.docs.map(doc => {
    const partyRef = doc.ref
    batch.set(
      partyRef,
      updateDocument<EntryParty>({
        entryUIDs: firestore.FieldValue.arrayUnion(user.uid)
      }),
      { merge: true }
    )
  })

  const partyRefIDs = partySnapShot.docs.map(doc => doc.ref.id)
  const partyRefPaths = partySnapShot.docs.map(doc => doc.ref.path)

  await batch.commit()

  const result = {
    documentID: partyRefIDs,
    path: partyRefPaths,
    value: user.uid
  }

  return { message: 'entry initial parties is succeded', contents: [result] }
})
