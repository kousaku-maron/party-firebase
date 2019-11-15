import React from 'react'
import { ContractWebviewTemplate } from '../templates'
import { TermsContents } from '../organisms'

const TermsWebviewPage = () => {
  return (
    <ContractWebviewTemplate title="利用規約">
      <TermsContents size="small" />
    </ContractWebviewTemplate>
  )
}

export default TermsWebviewPage
