import firebase from '../../repositories/firebase'

type Result = {
  success?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signOut = async (): Promise<Result> => {
  try {
    await firebase.auth().signOut()
    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
