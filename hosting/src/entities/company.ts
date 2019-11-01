export type Company = {
  name: string
  postNumber: string
  address: string
  email: string
  termsEstablishedAt: Date
  privacyEstablishedAt: Date
}

// どうしようね...　笑
export const initCompany = () => {
  const company: Company = {
    name: '株式会社 Party Project',
    postNumber: 'XXX-XXXX',
    address: '東京都XXXX',
    email: 'xxxx@xxxx.jp',
    termsEstablishedAt: new Date('2020/03/01 00:00'),
    privacyEstablishedAt: new Date('2020/04/01 00:00')
  }

  return company
}
