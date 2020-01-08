import { firestore } from 'firebase-admin'

// TODO: 本当に必要なパラメーターのみ保存するよう見直す。
export type Group = {
  organizerUID: string
  organizerName: string
  organizerGender: string
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (data: firestore.DocumentData) => {
  const newGroup: Group = {
    organizerUID: data.organizerID,
    organizerName: data.organizerName,
    organizerGender: data.gender,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }

  return newGroup
}
