export type User = {
  enabled: boolean
  uid: string
  name: string
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

export const initialUser = ({ uid }: { uid: string }) => {
  const user: User = {
    enabled: true,
    uid,
    name: '未設定'
  }

  return user
}
