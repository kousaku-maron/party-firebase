export type User = {
  enabled: boolean
  isAccepted: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = ({
  enabled,
  isAccepted,
  userID,
  uid,
  name,
  thumbnailURL
}: {
  enabled: boolean
  isAccepted: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
}) => {
  const user: User = { enabled, isAccepted, userID, name, uid, thumbnailURL }

  return user
}

export const initialUser = ({ uid, userID, name }: { uid: string, userID: string, name?: string }) => {
  const user: User = {
    enabled: true,
    isAccepted: false,
    uid,
    userID,
    name
  }

  return user
}
