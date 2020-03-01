import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  createDocument,
  buildUser,
  CreateApplyCard,
  CreateParty,
  buildParty,
  Group,
  buildGroup,
  recommendApplyCardPartyID,
  recommendApplyCardType
} from '../../entities'

const shuffleGroups = (groups: Group[]) => {
  const newGroups = groups.slice()
  for (let i = newGroups.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swapGroup = newGroups[i]
    newGroups[i] = newGroups[j]
    newGroups[j] = swapGroup
  }
  return newGroups
}

export const recommendApplyCards = functions.https.onCall(async () => {
  const db = firestore()
  let batch = db.batch()

  const usersRef = db.collection('users')
  const usersSnapShot = await usersRef.get()
  const users = usersSnapShot.docs.map((doc: firestore.DocumentData) => {
    return buildUser(doc.data()!)
  })

  const partiesRef = db.collection('parties').doc(recommendApplyCardPartyID)
  const partySnapShot = await partiesRef.get()
  const party = buildParty(partySnapShot.id!, partySnapShot.data()!)
  const { id, ...others } = party// eslint-disable-line
  const omittedParty = { ...others }
  const createParty: CreateParty = { ...omittedParty }

  const groupsRef = partiesRef.collection('groups')
  const groupsSnapShot = await groupsRef.get()
  const groups = groupsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return buildGroup(doc.id!, doc.data()!)
  })

  //TODO: 一時的にこの数字を使っています
  const recommendCardNumber = 3
  const maximumBatchSize = 500

  const usersTasks = users.map(async (user, userIndex) => {
    const shuffledGroups: Group[] = shuffleGroups(groups)
    const recommendedGroups: Group[] = shuffledGroups.slice(0, recommendCardNumber)
    const applyCardsRef = usersRef.doc(user.uid).collection('appliedCards')

    const oldCardsRef = applyCardsRef.where('type', '==', 'today')

    const oldCardsRefSnapShot = await oldCardsRef.get()

    oldCardsRefSnapShot.docs.map(doc => {
      const oldCardRef = doc.ref
      batch.delete(oldCardRef)
    })

    const groupsTasks = recommendedGroups.map(async (recommendedGroup, groupsIndex) => {
      const membersRef = groupsRef.doc(recommendedGroup.id).collection('members')
      const membersSnapShot = await membersRef.get()
      const members = membersSnapShot.docs.map((doc: firestore.DocumentData) => {
        return buildUser(doc.data()!)
      })

      if (((groupsIndex + 1 + recommendCardNumber) * (userIndex + 1)) % maximumBatchSize == 0) {
        await batch.commit()
        batch = db.batch()
      }

      batch.set(
        applyCardsRef.doc(),
        createDocument<CreateApplyCard>({
          partyID: recommendApplyCardPartyID,
          groupID: recommendedGroup.id,
          organizerUID: recommendedGroup.organizer.uid,
          users: members,
          party: createParty,
          type: recommendApplyCardType
        }),
        { merge: true }
      )
    })
    await Promise.all(groupsTasks)
  })

  await Promise.all(usersTasks)

  await batch.commit()

  //TODO: 何を入れるか考える
  const result = {
    value: true
  }

  return { message: 'recommend ApplyCard is succeded', contents: [result] }
})
