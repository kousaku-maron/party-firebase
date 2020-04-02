import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser, ApplyCard, buildUser } from '../../entities'

export const likeApplyCard = functions.https.onCall(async (data, context) => {
  const targetApplyCard: ApplyCard = data.applyCard
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')

  const targetUID = targetApplyCard.organizerUID
  const targetUserSnapShot = await usersRef.doc(targetUID).get()
  const targetUser = buildUser(targetUID, targetUserSnapShot.data()!)

  const partyID = targetApplyCard.partyID
  const partyRef = db.collection('parties').doc(partyID)
  const groupsRef = partyRef.collection('groups')

  const targetApplyCardID = targetApplyCard.id
  const targetApplyCardRef = usersRef
    .doc(uid)
    .collection('appliedCards')
    .doc(targetApplyCardID)

  const targetGroupID = targetApplyCard.groupID
  const userGroupsSnapShot = await groupsRef.where('organizerUID', '==', uid).get()

  if (userGroupsSnapShot.docs.length !== 1) return
  const userGroupID = userGroupsSnapShot.docs[0].id

  if (targetUser.likedGroupAssetIDs && targetUser.likedGroupAssetIDs.includes(userGroupID)) {
    batch.set(
      usersRef.doc(targetUID),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(userGroupID) }),
      { merge: true }
    )

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({
        matchGroupAssetIDs: firestore.FieldValue.arrayUnion(targetGroupID)
      }),
      { merge: true }
    )

    batch.delete(targetApplyCardRef)

    await batch.commit()

    const result = {
      documentID: targetApplyCard.id,
      path: targetApplyCardRef.path,
      value: targetGroupID
    }
    return { message: 'like  applyCard and match group is succeded', contents: [result] }
  }

  batch.set(
    usersRef.doc(targetUID),
    updateDocument<UpdateUser>({ likeGroupAssetIDs: firestore.FieldValue.arrayUnion(userGroupID) }),
    { merge: true }
  )

  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ likedGroupAssetIDs: firestore.FieldValue.arrayUnion(targetGroupID) }),
    { merge: true }
  )

  batch.delete(targetApplyCardRef)

  await batch.commit()

  const result = {
    documentID: targetApplyCard.id,
    path: targetApplyCardRef.path,
    value: targetGroupID
  }
  return { message: 'like  applyCardgik is succeded', contents: [result] }
})
