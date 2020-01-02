import { db } from './firebase'
import { buildUser, UpdateUser, updateDocument } from '../entities'
import { isNil } from 'lodash'

const usersRef = db.collection('users')

export const getUser = async (uid: string) => {
  try {
    const snapshot = await usersRef.doc(uid).get()
    if (!snapshot.exists) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = buildUser(snapshot.data()!)
    return user
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setUser = async (uid: string, user: UpdateUser) => {
  try {
    const batch = db.batch()

    batch.set(
      usersRef.doc(uid),
      updateDocument<UpdateUser>({
        ...(!isNil(user.enabled) && { enabled: user.enabled }),
        ...(!isNil(user.isAccepted) && { isAccepted: user.isAccepted })
      }),
      { merge: true }
    )

    await batch.commit()

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
