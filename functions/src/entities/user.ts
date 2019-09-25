export type User = {
  enabled: boolean
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = ({
  enabled,
  uid,
  name,
  thumbnailURL
}: {
  enabled: boolean
  uid: string
  name: string
  thumbnailURL?: string
}) => {
  const user: User = { enabled, name, uid, thumbnailURL }

  return user
}

export const initialUser = ({ uid, name }: { uid: string, name?: string }) => {
  const user: User = {
    enabled: true,
    uid,
    name
  }

  return user
}
