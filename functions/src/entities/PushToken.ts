import { firestore } from 'firebase-admin'

export type PushToken = {
  id: string
  token: string
}

export const buildPushToken = (id: string, data: firestore.DocumentData) => {
  const newPushToken: PushToken = {
    id,
    token: data.token
  }
  return newPushToken
}
