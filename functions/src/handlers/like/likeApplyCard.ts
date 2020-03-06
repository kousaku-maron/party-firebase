import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  updateDocument,
  UpdateUser,
  buildGroupAsset,
  CreateGroupAsset,
  buildGroup,
  createDocument,
  ApplyCard,
  CreateApplyCard
} from '../../entities'

export const likeApplyCard = functions.https.onCall(async (data, context) => {
  const organizerApplyCard: ApplyCard = data.applyCard
  const uid = context!.auth!.uid

  const db = firestore()
  const batch = db.batch()

  const usersRef = db.collection('users')
  const partyID = organizerApplyCard.partyID
  const partyRef = db.collection('parties').doc(partyID)
  const groupsRef = partyRef.collection('groups')

  const organizerApplyCardID = organizerApplyCard.id
  const organizerApplyCardRef = usersRef
    .doc(uid)
    .collection('appliedCards')
    .doc(organizerApplyCardID)

  const organizerUID = organizerApplyCard.organizerUID
  const organizerGroupID = organizerApplyCard.groupID
  const organizerMatchedGroupAssetsRef = usersRef.doc(organizerUID).collection('matchedGroupAssets')

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

  const organizerMyGroupAssetRef = usersRef
    .doc(organizerUID)
    .collection('myGroupAssets')
    .where('groupID', '==', organizerGroupID)

  const organizerMyGroupAssetSnapShot = await organizerMyGroupAssetRef.get()

  //MEMO: ここではgroupIDが被る可能性があるが，0番目のorganizerデータを使う
  if (organizerMyGroupAssetSnapShot.docs.length === 0) return

  const organizerMyGroupAsset = buildGroupAsset(
    organizerMyGroupAssetSnapShot.docs[0].id!,
    organizerMyGroupAssetSnapShot.docs[0].data()!
  )

  const organizerLikedGroupAssetSnapShot = await usersRef
    .doc(organizerUID)
    .collection('likedGroupAssets')
    .doc(userMyGroupAsset.id)
    .get()

  if (organizerLikedGroupAssetSnapShot.exists) {
    const userMatchedGroupAssetsRef = usersRef.doc(uid).collection('matchedGroupAssets')

    batch.set(
      userMatchedGroupAssetsRef.doc(organizerMyGroupAsset.id),
      createDocument<CreateGroupAsset>({
        groupID: organizerMyGroupAsset.groupID,
        group: organizerMyGroupAsset.group
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(organizerMyGroupAsset.id) }),
      { merge: true }
    )

    batch.set(
      organizerMatchedGroupAssetsRef.doc(userMyGroupAsset.id),
      createDocument<CreateGroupAsset>({
        groupID: userMyGroupAsset.groupID,
        group: userMyGroupAsset.group
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(organizerUID),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(userMyGroupAsset.id) }),
      { merge: true }
    )

    batch.delete(organizerApplyCardRef)

    await batch.commit()

    //TODO: 何入れるか考える
    const result = {
      value: true
    }
    return { message: 'like  applyCard is succeded', contents: [result] }
  }

  const userLikedGroupAssetsRef = usersRef.doc(uid).collection('likedGroupAssets')

  batch.set(
    userLikedGroupAssetsRef.doc(organizerMyGroupAsset.id),
    createDocument<CreateGroupAsset>({
      groupID: organizerMyGroupAsset.groupID,
      group: organizerMyGroupAsset.group
    }),
    {
      merge: true
    }
  )
  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ likedGroupAssetIDs: firestore.FieldValue.arrayUnion(organizerMyGroupAsset.id) }),
    { merge: true }
  )

  const organizerLikeGroupAssetsRef = usersRef.doc(organizerUID).collection('likeGroupAssets')

  batch.set(
    organizerLikeGroupAssetsRef.doc(userMyGroupAsset.id),
    createDocument<CreateGroupAsset>({
      groupID: userMyGroupAsset.id,
      group: userMyGroupAsset.group
    }),
    {
      merge: true
    }
  )

  batch.set(
    usersRef.doc(organizerUID),
    updateDocument<UpdateUser>({ likeGroupAssetIDs: firestore.FieldValue.arrayUnion(userMyGroupAsset.id) }),
    { merge: true }
  )

  const organizerUserMyGroupAssetRef = usersRef
    .doc(organizerUID)
    .collection('appliedCards')
    .where('groupID', '==', userGroupID)
  const organizerUserMyGroupAssetSnapShot = await organizerUserMyGroupAssetRef.get()

  if (organizerUserMyGroupAssetSnapShot.docs.length === 0) {
    batch.set(
      organizerUserMyGroupAssetRef,
      createDocument<CreateApplyCard>({
        partyID,
        groupID: userGroupID,
        organizerUID: uid,
        members: [userGroup.organizer],
        party: organizerApplyCard.party,
        type: organizerApplyCard.type
      }),
      {
        merge: true
      }
    )
  }

  batch.delete(organizerApplyCardRef)

  await batch.commit()

  //TODO: 何入れるか考える
  const result = {
    value: true
  }

  return { message: 'like  applyCard is succeded and matched', contents: [result] }
})
