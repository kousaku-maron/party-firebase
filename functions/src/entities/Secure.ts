import { firestore } from 'firebase-admin'

export type Secure = {
  certificateURL?: string
  pushTokens?: string[]
}

export const buildSecure = (data: firestore.DocumentData) => {
  const newSecure = {
    certificateURL: data.certificateURL,
    pushTokens: data.pushTokens
  }

  return newSecure
}
