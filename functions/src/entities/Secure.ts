import { firestore } from 'firebase-admin'

export type Secure = {
  id: string
  certificateURL?: string
  pushTokens?: string[]
}

export const buildSecure = (id: string, data: firestore.DocumentData) => {
  const newSecure: Secure = {
    id,
    certificateURL: data.certificateURL,
    pushTokens: data.pushTokens
  }

  return newSecure
}

export type CreateSecure = Omit<Secure, 'id'>
