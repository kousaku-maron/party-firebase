import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildParty } from '../../entities'
import { difference } from 'lodash'

const groupPath = 'parties/{partyID}'

export const deleteGroup = functions.firestore.document(groupPath).onUpdate(async (change, context) => {
  const partyBeforeSnapShot = await change.before.ref.get()
  const partyAfterSnapShot = await change.after.ref.get()
  if (!partyBeforeSnapShot.exists || !partyAfterSnapShot.exists) {
    throw new Error('not found party')
  }

  const partyBefore = buildParty(change.before.id!, change.before.data()!)
  const partyAfter = buildParty(change.after.id!, change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const removeEntryUIDs = difference(partyBefore.entryUIDs ?? [], partyAfter.entryUIDs ?? [])

  if (removeEntryUIDs.length === 0) {
    return { message: 'There are no remove uids to create.', contents: null }
  }

  const groupsRef = change.after.ref.collection('groups')

  const task = removeEntryUIDs.map(async uid => {
    const userRef = db.collection('users').doc(uid)
    const userSnapShot = await userRef.get()
    if (!userSnapShot.exists) return

    const groupSnapShot = await groupsRef.where('organizerUID', '==', uid).get()
    if (!groupSnapShot.docs[0].exists) return

    batch.delete(groupSnapShot.docs[0].ref)
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: partyAfter
  }

  return { message: 'Group is deleted successfully', contents: [result] }
})
