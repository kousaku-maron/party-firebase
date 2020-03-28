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

  if (targetLikedGroupAssetSnapShot.docs.length !== 0) {
    const userMatchedGroupAssetsRef = usersRef.doc(uid).collection('matchGroupAssets')
    const userMatchedGroupAssetRef = userMatchedGroupAssetsRef.doc()

    const targetMatchedGroupAssetsRef = usersRef.doc(targetUID).collection('matchGroupAssets')
    const targetMatchedGroupAssetRef = targetMatchedGroupAssetsRef.doc()

    batch.set(
      userMatchedGroupAssetsRef.doc(targetMatchedGroupAssetRef.id),
      createDocument<CreateGroupAsset>({
        groupID: targetMyGroupAsset.groupID,
        group: targetMyGroupAsset.group,
        enabled: true
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({
        matchGroupAssetIDs: firestore.FieldValue.arrayUnion(targetMatchedGroupAssetRef.id)
      }),
      { merge: true }
    )

    batch.set(
      targetMatchedGroupAssetsRef.doc(userMatchedGroupAssetRef.id),
      createDocument<CreateGroupAsset>({
        groupID: userMyGroupAsset.groupID,
        group: userMyGroupAsset.group,
        enabled: true
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(targetUID),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(userMatchedGroupAssetRef.id) }),
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
  const userLikedGroupAsset = usersRef
    .doc(uid)
    .collection('likedGroupAssets')
    .doc()

  const targetLikeGroupAssetsRef = usersRef.doc(targetUID).collection('likeGroupAssets')
  const targetLikeGroupAssetRef = usersRef
    .doc(targetUID)
    .collection('likeGroupAssets')
    .doc()

  batch.set(
    userLikedGroupAssetsRef.doc(targetLikeGroupAssetRef.id),
    createDocument<CreateGroupAsset>({
      groupID: targetMyGroupAsset.groupID,
      group: targetMyGroupAsset.group,
      enabled: true
    }),
    {
      merge: true
    }
  )
  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ likedGroupAssetIDs: firestore.FieldValue.arrayUnion(targetLikeGroupAssetRef.id) }),
    { merge: true }
  )

  batch.set(
    targetLikeGroupAssetsRef.doc(userLikedGroupAsset.id),
    createDocument<CreateGroupAsset>({
      groupID: userMyGroupAsset.id,
      group: userMyGroupAsset.group,
      enabled: true
    }),
    {
      merge: true
    }
  )

  batch.set(
    usersRef.doc(targetUID),
    updateDocument<UpdateUser>({ likeGroupAssetIDs: firestore.FieldValue.arrayUnion(userLikedGroupAsset.id) }),
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
