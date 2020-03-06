import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  updateDocument,
  UpdateUser,
  buildGroupAsset,
  CreateGroupAsset,
  buildGroup,
  createDocument,
  ApplyCard
} from '../../entities'

export const likeApplyCard = functions.https.onCall(async (data, context) => {
  const targetApplyCard: ApplyCard = data.applyCard
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')
  const partyID = targetApplyCard.partyID
  const partyRef = db.collection('parties').doc(partyID)
  const groupsRef = partyRef.collection('groups')

  const targetApplyCardID = targetApplyCard.id
  const targetApplyCardRef = usersRef
    .doc(uid)
    .collection('appliedCards')
    .doc(targetApplyCardID)

  const targetUID = targetApplyCard.organizerUID
  const targetGroupID = targetApplyCard.groupID

  const userGroupsSnapShot = await groupsRef.where('organizerUID', '==', uid).get()

  if (userGroupsSnapShot.docs.length !== 1) return
  const userGroup = buildGroup(userGroupsSnapShot.docs[0].id!, userGroupsSnapShot.docs[0].data()!)
  const userGroupID = userGroup.id

  const userMyGroupAssetRef = usersRef
    .doc(uid)
    .collection('myGroupAssets')
    .where('groupID', '==', userGroupID)

  const userMyGroupAssetsSnapShot = await userMyGroupAssetRef.get()
  //MEMO: ここではgroupIDが被る可能性があるが，0番目のorganizerデータを使う
  if (userMyGroupAssetsSnapShot.docs.length === 0) return

  const userMyGroupAsset = buildGroupAsset(
    userMyGroupAssetsSnapShot.docs[0].id!,
    userMyGroupAssetsSnapShot.docs[0].data()!
  )

  const targetMyGroupAssetRef = usersRef
    .doc(targetUID)
    .collection('myGroupAssets')
    .where('groupID', '==', targetGroupID)

  const targetMyGroupAssetSnapShot = await targetMyGroupAssetRef.get()

  //MEMO: ここではgroupIDが被る可能性があるが，0番目のtargetデータを使う
  if (targetMyGroupAssetSnapShot.docs.length === 0) return

  const targetMyGroupAsset = buildGroupAsset(
    targetMyGroupAssetSnapShot.docs[0].id!,
    targetMyGroupAssetSnapShot.docs[0].data()!
  )

  const targetLikedGroupAssetRef = usersRef
    .doc(targetUID)
    .collection('likedGroupAssets')
    .where('groupID', '==', userGroupID)

  const targetLikedGroupAssetSnapShot = await targetLikedGroupAssetRef.get()

  const userMatchedGroupAssetsRef = usersRef.doc(uid).collection('matchedGroupAssets')
  const userMyGroupAssetID = userMatchedGroupAssetsRef.doc().id

  const targetMatchedGroupAssetsRef = usersRef.doc(targetUID).collection('matchedGroupAssets')
  const targetMyGroupAssetID = targetMatchedGroupAssetsRef.doc().id

  if (targetLikedGroupAssetSnapShot.docs.length !== 0) {
    batch.set(
      userMatchedGroupAssetsRef.doc(targetMyGroupAssetID),
      createDocument<CreateGroupAsset>({
        groupID: targetMyGroupAsset.groupID,
        group: targetMyGroupAsset.group
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(targetMyGroupAssetID) }),
      { merge: true }
    )

    batch.set(
      targetMatchedGroupAssetsRef.doc(userMyGroupAssetID),
      createDocument<CreateGroupAsset>({
        groupID: userMyGroupAsset.groupID,
        group: userMyGroupAsset.group
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(targetUID),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(userMyGroupAssetID) }),
      { merge: true }
    )

    batch.delete(targetApplyCardRef)

    await batch.commit()

    //TODO: 何入れるか考える
    const result = {
      value: true
    }
    return { message: 'like  applyCard is succeded', contents: [result] }
  }

  const userLikedGroupAssetsRef = usersRef.doc(uid).collection('likedGroupAssets')

  batch.set(
    userLikedGroupAssetsRef.doc(targetMyGroupAssetID),
    createDocument<CreateGroupAsset>({
      groupID: targetMyGroupAsset.groupID,
      group: targetMyGroupAsset.group
    }),
    {
      merge: true
    }
  )
  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ likedGroupAssetIDs: firestore.FieldValue.arrayUnion(targetMyGroupAssetID) }),
    { merge: true }
  )

  const targetLikeGroupAssetsRef = usersRef.doc(targetUID).collection('likeGroupAssets')

  batch.set(
    targetLikeGroupAssetsRef.doc(userMyGroupAssetID),
    createDocument<CreateGroupAsset>({
      groupID: userMyGroupAsset.id,
      group: userMyGroupAsset.group
    }),
    {
      merge: true
    }
  )

  batch.set(
    usersRef.doc(targetUID),
    updateDocument<UpdateUser>({ likeGroupAssetIDs: firestore.FieldValue.arrayUnion(userMyGroupAssetID) }),
    { merge: true }
  )

  // const targetUserMyGroupAssetRef = usersRef
  //   .doc(targetUID)
  //   .collection('appliedCards')
  //   .where('groupID', '==', userGroupID)
  // const targetUserMyGroupAssetSnapShot = await targetUserMyGroupAssetRef.get()

  // if (targetUserMyGroupAssetSnapShot.docs.length === 0) {
  //   batch.set(
  //     targetUserMyGroupAssetRef,
  //     createDocument<CreateApplyCard>({
  //       partyID,
  //       groupID: userGroupID,
  //       organizerUID: uid,
  //       members: [userGroup.organizer],
  //       party: targetApplyCard.party,
  //       type: targetApplyCard.type
  //     }),
  //     {
  //       merge: true
  //     }
  //   )
  // }

  batch.delete(targetApplyCardRef)

  await batch.commit()

  //TODO: 何入れるか考える
  const result = {
    value: true
  }

  return { message: 'like  applyCard is succeded and matched', contents: [result] }
})
