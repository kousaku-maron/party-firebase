export type Report = {
  reportUserUID: string
  reportedUserUID: string
  comment: string
}

export const buildReport = (reportUserUID: string, reportedUserUID: string, comment: string) => {
  const newReport: Report = {
    reportUserUID,
    reportedUserUID,
    comment
  }
  return newReport
}
