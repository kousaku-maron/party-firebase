import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  updateDocument,
  User,
  UpdateUser,
  buildUser,
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

  const organizerApplyCardID = organizerApplyCard.id

  const organizerApplyCardRef = usersRef
    .doc(uid)
    .collection('appliedCards')
    .doc(organizerApplyCardID)

  const partyID = organizerApplyCard.partyID
  const partyRef = db.collection('parties').doc(partyID)
  const groupsRef = partyRef.collection('groups')

  const organizerUID = organizerApplyCard.organizerUID
  const organizerSnapShot = await usersRef.doc(organizerUID).get()
  const organizer = buildUser(organizerSnapShot.id!, organizerSnapShot.data()!)

  const organizerGroupID = organizerApplyCard.groupID
  const organizerGroupSnapShot = await groupsRef.doc(organizerGroupID).get()
  const organizerGroup = buildGroup(organizerGroupSnapShot.id!, organizerGroupSnapShot.data()!)
  const organizerMatchedGroupAssetsRef = usersRef.doc(organizerUID).collection('matchedGroupAssets')

  const userGroupsSnapShot = await groupsRef.where('organizerUID', '==', uid).get()

  if (userGroupsSnapShot.docs.length !== 1) return
  const userGroup = buildGroup(userGroupsSnapShot.docs[0].id!, userGroupsSnapShot.docs[0].data()!)
  const userGroupID = userGroup.id

  const userMatchedGroupAssetsRef = usersRef.doc(uid).collection('matchedGroupAssets')

  if (organizer.likedGroupAssetIDs && organizer.likedGroupAssetIDs.includes(userGroupID)) {
    batch.set(
      userMatchedGroupAssetsRef.doc(organizerGroupID),
      createDocument<CreateGroupAsset>({
        groupID: organizerGroupID,
        group: organizerGroup
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(organizerGroupID) }),
      { merge: true }
    )

    batch.set(
      organizerMatchedGroupAssetsRef.doc(userGroupID),
      createDocument<CreateGroupAsset>({
        groupID: userGroupID,
        group: userGroup
      }),
      {
        merge: true
      }
    )

    batch.set(
      usersRef.doc(organizerUID),
      updateDocument<UpdateUser>({ matchGroupAssetIDs: firestore.FieldValue.arrayUnion(userGroupID) }),
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
    userLikedGroupAssetsRef.doc(organizerGroupID),
    createDocument<CreateGroupAsset>({
      groupID: organizerGroupID,
      group: organizerGroup
    }),
    {
      merge: true
    }
  )
  batch.set(
    usersRef.doc(uid),
    updateDocument<UpdateUser>({ likedGroupAssetIDs: firestore.FieldValue.arrayUnion(organizerGroupID) }),
    { merge: true }
  )

  const userMyGroupAssetRef = usersRef
    .doc(uid)
    .collection('myGroupAssets')
    .doc(userGroupID)

  const userMyGroupAssetSnapShot = await userMyGroupAssetRef.get()

  const userMyGroupAsset = buildGroupAsset(userMyGroupAssetSnapShot.id!, userMyGroupAssetSnapShot.data()!)
  const { id, ...others } = userMyGroupAsset // eslint-disable-line
  const createUserMyGroupAsset = { ...others }

  const organizerLikeGroupAssetsRef = usersRef.doc(organizerUID).collection('likeGroupAssets')

  batch.set(
    organizerLikeGroupAssetsRef.doc(userGroupID),
    createDocument<CreateGroupAsset>({ ...createUserMyGroupAsset }),
    {
      merge: true
    }
  )

  batch.set(
    usersRef.doc(organizerUID),
    updateDocument<UpdateUser>({ likeGroupAssetIDs: firestore.FieldValue.arrayUnion(userGroupID) }),
    { merge: true }
  )

  const usreGroupMembersRef = partyRef
    .collection('groups')
    .doc(userGroupID)
    .collection('members')
  const usreGroupMembersSnapShot = await usreGroupMembersRef.get()

  const usreGroupMembers: User[] = usreGroupMembersSnapShot.docs.map(doc => {
    return buildUser(doc.id!, doc.data()!)
  })

  batch.set(
    usersRef.doc(organizerUID),
    createDocument<CreateApplyCard>({
      partyID,
      groupID: userGroupID,
      organizerUID: uid,
      members: [...usreGroupMembers],
      party: organizerApplyCard.party,
      type: organizerApplyCard.type
    }),
    {
      merge: true
    }
  )

  batch.delete(organizerApplyCardRef)

  await batch.commit()

  //TODO: 何入れるか考える
  const result = {
    value: true
  }

  return { message: 'like  applyCard is succeded and matched', contents: [result] }
})
