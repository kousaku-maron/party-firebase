export type Secure = {
  certificateURL?: string
  pushTokens?: string[]
}

export const buildSecure = ({
  certificateURL,
  pushTokens
}: {
  certificateURL?: string
  pushTokens?: string
}) => {
  const newSecure = {
    certificateURL: certificateURL,
    pushTokens: pushTokens
  }

  return newSecure
}
