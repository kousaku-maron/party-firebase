import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { createDocument, CreateApplyCard, buildParty, Group, buildGroup, recommendApplyCardTags } from '../../entities'
import { shuffle } from '../../services/util'

const recommendCardNumber = 3
const maximumBatchSize = 500

export const recommendApplyCards = functions.https.onCall(async () => {
  const db = firestore()
  let batch = db.batch()
  const partiesRef = db.collection('parties')

  const tagedPartyRef = partiesRef
    .where('enabled', '==', true)
    .where('tags', 'array-contains-any', recommendApplyCardTags)
  const partySnapShot = await tagedPartyRef.get()

  if (partySnapShot.docs.length == 0) return

  const partyTasks = partySnapShot.docs.map(async partyDocument => {
    const party = buildParty(partyDocument.id!, partyDocument.data()!)
    const partyID = party.id

    const groupsRef = partiesRef.doc(partyID).collection('groups')
    const groupsSnapShot = await groupsRef.get()
    const groups = groupsSnapShot.docs.map((doc: firestore.DocumentData) => {
      return buildGroup(doc.id!, doc.data()!)
    })

    const userTasks = groups.map(async (group, index) => {
      const { id: MyGroupID, organizer } = group

      const shuffledGroups: Group[] = shuffle<Group>(groups.filter(group => group.id !== MyGroupID))
      const recommendedGroups: Group[] = shuffledGroups.slice(0, recommendCardNumber)

      const applyCardsRef = db
        .collection('users')
        .doc(organizer.uid)
        .collection('appliedCards')
      const oldCardsRef = applyCardsRef.where('type', '==', party.type)

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
            partyID: partyID,
            groupID: recommendedGroup.id,
            organizerUID: recommendedGroup.organizer.uid,
            party: party,
            type: party.type,
            members: [recommendedGroup.organizer]
          }),
          { merge: true }
        )
      })

      await Promise.all(createCardTasks)
    })

    await Promise.all(userTasks)
  })

  await Promise.all(partyTasks)

  await batch.commit()

  //TODO: 何を入れるか考える
  const result = {
    value: true
  }

  return { message: 'recommend ApplyCard is succeded', contents: [result] }
})
