import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import {
  createDocument,
  CreateApplyCard,
  buildParty,
  Group,
  buildGroup,
  recommendApplyCardPartyID,
  recommendApplyCardType
} from '../../entities'
import { shuffle } from '../../services/util'

const recommendCardNumber = 3
const maximumBatchSize = 500

export const recommendApplyCards = functions.https.onCall(async () => {
  const db = firestore()
  let batch = db.batch()

  const partiesRef = db.collection('parties').doc(recommendApplyCardPartyID)
  const partySnapShot = await partiesRef.get()
  const party = buildParty(partySnapShot.id!, partySnapShot.data()!)

  const groupsRef = partiesRef.collection('groups')
  const groupsSnapShot = await groupsRef.get()
  const groups = groupsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return buildGroup(doc.id!, doc.data()!)
  })

  const tasks = groups.map(async (group, index) => {
    const { id: MyGroupID, organizer } = group

    const shuffledGroups: Group[] = shuffle<Group>(groups.filter(group => group.id !== MyGroupID))
    const recommendedGroups: Group[] = shuffledGroups.slice(0, recommendCardNumber)

    const applyCardsRef = db
      .collection('users')
      .doc(organizer.uid)
      .collection('appliedCards')
    const oldCardsRef = applyCardsRef.where('type', '==', recommendApplyCardType)

    const oldCardsRefSnapShot = await oldCardsRef.get()

    oldCardsRefSnapShot.docs.map(doc => {
      const oldCardRef = doc.ref
      batch.delete(oldCardRef)
    })

    const createCardTasks = recommendedGroups.map(async (recommendedGroup, groupIndex) => {
      if (((groupIndex + 1 + recommendCardNumber) * (index + 1)) % maximumBatchSize == 0) {
        await batch.commit()
        batch = db.batch()
      }
      //MEMO: 将来的に同伴ユーザーも入れることを考えて，membersは配列にしている
      batch.set(
        applyCardsRef.doc(),
        createDocument<CreateApplyCard>({
          partyID: recommendApplyCardPartyID,
          groupID: recommendedGroup.id,
          organizerUID: recommendedGroup.organizer.uid,
          party: party,
          type: recommendApplyCardType,
          members: [recommendedGroup.organizer]
        }),
        { merge: true }
      )
    })

    await Promise.all(createCardTasks)
  })

  await Promise.all(tasks)

  await batch.commit()

  //TODO: 何を入れるか考える
  const result = {
    value: true
  }

  return { message: 'recommend ApplyCard is succeded', contents: [result] }
})
