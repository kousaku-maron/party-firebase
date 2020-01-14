import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { buildGroup } from '../../entities'
import { difference } from 'lodash'

const groupPath = 'parties/{partyID}/groups/{groupID}'

export const deleteApplyCard = functions.firestore.document(groupPath).onUpdate(async (change, context) => {
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

  const deleteAppliedUIDs = difference(groupBefore.appliedUIDs, groupAfter.appliedUIDs)
  const applyCardsBeforeRef = db
    .collection('users')
    .doc(groupBefore.organizerUID)
    .collection('appliedCards')

  if (deleteAppliedUIDs.length === 0) {
    return { message: 'There are no apply cards to delete.', contents: null }
  }

  const task = deleteAppliedUIDs.map(async uid => {
    const targetCardsRef = applyCardsBeforeRef
      .where('partyID', '==', partyID)
      .where('groupID', '==', groupID)
      .where('organizerUID', '==', uid)

    const targetCardsSnapShot = await targetCardsRef.get()
    if (targetCardsSnapShot.docs.length !== 1) return

    const targetCardRef = targetCardsSnapShot.docs[0].ref
    batch.delete(targetCardRef)
  })

  await Promise.all(task)

  await batch.commit()

  const result = {
    documentID: change.before.ref,
    path: change.after.ref.path,
    value: groupBefore
  }

  return { message: 'Apply Cards are deleted successfully', contents: [result] }
})
