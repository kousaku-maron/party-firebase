import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildGroup, createDocument, ApplyCard, buildUser } from '../../entities'
import { difference } from 'lodash'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const createApplyCard = functions.firestore.document(groupPath).onUpdate(async (change, context) => {
  const groupBeforeSnapShot = await change.before.ref.get()
  const groupAfterSnapShot = await change.after.ref.get()
  if (!groupBeforeSnapShot.exists || !groupAfterSnapShot.exists) {
    throw new Error('not found group')
  }

  const partyID = context.params.partyID
  const groupID = context.params.groupID

  const groupBefore = buildGroup(change.before.data()!)
  const groupAfter = buildGroup(change.after.data()!)

  const db = firestore()
  const batch = db.batch()

  const newAppliedUIDs = difference(groupAfter.appliedUIDs, groupBefore.appliedUIDs)

  const applyCardsAfterRef = db
    .collection('users')
    .doc(groupAfter.organizerUID)
    .collection('appliedCards')

  if (newAppliedUIDs.length === 0) {
    return { message: 'There are no apply cards to create.', contents: null }
  }

  const task = newAppliedUIDs.map(async uid => {
    const userRef = db.collection('users').doc(uid)
    const userSnapShot = await userRef.get()
    if (!userSnapShot.exists) return

    const user = buildUser(userSnapShot.data()!)

    batch.set(
      applyCardsAfterRef.doc(),
      createDocument<ApplyCard>({
        partyID,
        groupID,
        organizerUID: uid,
        users: [user]
      }),
      { merge: true }
    )
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.after.ref,
    path: change.after.ref.path,
    value: groupAfter
  }

  return { message: 'Apply Cards are created successfully', contents: [result] }
})
