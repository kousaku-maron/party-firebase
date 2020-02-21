import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser, Report, buildReport } from '../../entities'

export const reportUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const reportUserUID = uid
  const reportedUserUID = data.reportedUserUID as string
  const comment = data.comment as string
  const report = buildReport(reportUserUID, reportedUserUID, comment)

  const db = firestore()
  const batch = db.batch()
  const reportsRef = db.collection('reports').doc()
  batch.set(reportsRef, updateDocument<Report>(report), { merge: true })

  const userRef = db.collection('users')
  batch.set(
    userRef.doc(reportedUserUID),
    updateDocument<UpdateUser>({ reportUserUIDs: firestore.FieldValue.arrayUnion(reportUserUID) }),
    { merge: true }
  )

  await batch.commit()

  const result = {
    reportID: reportsRef.id,
    path: reportsRef.path,
    value: report
  }

  return { message: 'report user is succeded', contents: [result] }
})
