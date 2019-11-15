import React from 'react'
import { ContractWebviewTemplate } from '../templates'
import { PrivacyContents } from '../organisms'

const PrivacyWebviewPage = () => {
  return (
    <ContractWebviewTemplate title="プライバシーポリシー">
      <PrivacyContents size="small" />
    </ContractWebviewTemplate>
  )
}

export default PrivacyWebviewPage
