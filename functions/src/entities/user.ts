export type User = {
  enabled: boolean
  isAccepted: boolean
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = ({
  enabled,
  isAccepted,
  uid,
  name,
  thumbnailURL
}: {
  enabled: boolean
  isAccepted: boolean
  uid: string
  name?: string
  thumbnailURL?: string
}) => {
  const user: User = { enabled, isAccepted, name, uid, thumbnailURL }

  return user
}

export const initialUser = ({ uid, name }: { uid: string, name?: string }) => {
  const user: User = {
    enabled: true,
    isAccepted: false,
    uid,
    name
  }

  return user
}
