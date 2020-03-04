import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { createDocument, buildUser, buildParty, CreateGroup } from '../../entities'
import { difference } from 'lodash'

const groupPath = 'parties/{partyID}'

export const createGroup = functions.firestore.document(groupPath).onUpdate(async (change, _context) => {
  const partyBeforeSnapShot = await change.before.ref.get()
  const partyAfterSnapShot = await change.after.ref.get()
  if (!partyBeforeSnapShot.exists || !partyAfterSnapShot.exists) {
    throw new Error('not found party')
  }

  const partyBefore = buildParty(change.before.id!, change.before.data()!)
  const partyAfter = buildParty(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const newEntryUIDs = difference(partyAfter.entryUIDs ?? [], partyBefore.entryUIDs ?? [])

  if (newEntryUIDs.length === 0) {
    return { message: 'There are no new uids to create.', contents: null }
  }

  const groupsRef = change.after.ref.collection('groups')

  const task = newEntryUIDs.map(async uid => {
    const userRef = db.collection('users').doc(uid)
    const userSnapShot = await userRef.get()
    if (!userSnapShot.exists) return

    const user = buildUser(userRef.id, userSnapShot.data()!)

    batch.set(
      groupsRef.doc(),
      createDocument<CreateGroup>({
        organizerUID: uid,
        organizer: user,
        appliedUIDs: []
      }),
      { merge: true }
    )
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: partyAfter
  }

  return { message: 'Group is created successfully', contents: [result] }
})
