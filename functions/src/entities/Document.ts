import { FieldValue } from '@google-cloud/firestore'

export const createDocument = <T>(document: T) => {
  return {
    ...document,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  }
}

export const updateDocument = <T>(document: T) => {
  return {
    ...document,
    updatedAt: FieldValue.serverTimestamp()
  }
}
