import { firestore } from 'firebase-admin'
import { Group, buildGroup } from './Group'

export type GroupAsset = {
  id: string
  groupID: string
  enabled: boolean
  group: Group
}

export const buildGroupAsset = (id: string, data: firestore.DocumentData) => {
  const newGroupAsset: GroupAsset = {
    id,
    groupID: data.groupID,
    group: buildGroup(data.group.id, data.group),
    enabled: data.enabled
  }

  return newGroupAsset
}

export type CreateGroupAsset = Omit<GroupAsset, 'id'>
export type UpdateGroupAsset = { group: Group }
