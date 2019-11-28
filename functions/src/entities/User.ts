export type User = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = ({
  enabled,
  isAccepted,
  isAnonymous,
  userID,
  uid,
  name,
  thumbnailURL
}: {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
}) => {
  const user: User = { enabled, isAccepted, isAnonymous, userID, name, uid, thumbnailURL }

  return user
}

export const initialUser = ({ uid, userID, name, isAnonymous }: { uid: string, userID: string, name?: string, isAnonymous: boolean }) => {
  const user: User = {
    enabled: true,
    isAccepted: false,
    isAnonymous,
    uid,
    userID,
    name
  }

  return user
}

export const ANONYMOUS_USERNAME = 'anonymous'
