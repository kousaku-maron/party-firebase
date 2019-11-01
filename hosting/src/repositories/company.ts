import { initCompany } from '../entities'

export const getCompany = () => {
  const company = initCompany()
  return company
}
