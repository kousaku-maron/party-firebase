import firebase from '../../repositories/firebase'

type Result = {
  success?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signInFacebook = async (): Promise<Result> => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider()
    await firebase.auth().signInWithRedirect(provider)
    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
