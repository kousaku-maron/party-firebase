import { firestore } from 'firebase-admin'

// TODO: 本当に必要なパラメーターのみ保存するよう見直す。
//TODO: id groupID　どちらを残すか考える
export type Group = {
  id: string
  organizerUID: string
  organizerName: string
  organizerGender: string
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firestore.DocumentData) => {
  const newGroup: Group = {
    id,
    organizerUID: data.organizerUID,
    organizerName: data.organizerName,
    organizerGender: data.organizerGender,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }

  return newGroup
}
