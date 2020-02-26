import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { createDocument, buildUser, ApplyCard, buildParty, Group, buildGroup } from '../../entities'
import { getRandomID } from '../../services/util'

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
  const batch = db.batch()
  const usersRef = db.collection('users')
  const usersSnapShot = await usersRef.get()
  const users = usersSnapShot.docs.map((doc: firestore.DocumentData) => {
    return buildUser(doc.data()!)
  })

  //MEMO: 一時的に横浜のIDをとってきています　恐らく将来的には参加しているpartyのIDを使います
  const tmpYokoHamaPartyID = 'ifnY4xa1BmHlf0qdQR2Z'
  const partiesRef = db.collection('parties').doc(tmpYokoHamaPartyID)
  const partySnapShot = await partiesRef.get()
  const party = buildParty(partiesRef.id!, partySnapShot.data()!)

  const groupsRef = partiesRef.collection('groups')
  const groupsSnapShot = await groupsRef.get()
  const groups = groupsSnapShot.docs.map((doc: firestore.DocumentData) => {
    return buildGroup(doc.id!, doc.data()!)
  })

  //TODO: 一時的にこの数字を使っています
  const recommendCardNumber = 3

  users.map(user => {
    const shuffledGroups: Group[] = shuffleGroups(groups)
    const recommendedGroups: Group[] = shuffledGroups.slice(0, recommendCardNumber)

    recommendedGroups.map(async recommendedGroup => {
      const membersRef = groupsRef.doc(recommendedGroup.id).collection('members')
      const membersSnapShot = await membersRef.get()
      const members = membersSnapShot.docs.map((doc: firestore.DocumentData) => {
        return buildUser(doc.data()!)
      })

      const applyCardID = getRandomID()

      const applyCardsRef = usersRef.doc(user.uid).collection('appliedCards')
      batch.set(
        applyCardsRef.doc(recommendedGroup.id),
        createDocument<ApplyCard>({
          id: applyCardID,
          partyID: tmpYokoHamaPartyID,
          groupID: recommendedGroup.id,
          organizerUID: recommendedGroup.organizerUID,
          users: members,
          party: party
        }),
        { merge: true }
      )
    })
  })

  await batch.commit()

  //TODO: 何を入れるか考える
  const result = {
    value: true
  }

  return { message: 'recommend ApplyCard is succeded', contents: [result] }
})
