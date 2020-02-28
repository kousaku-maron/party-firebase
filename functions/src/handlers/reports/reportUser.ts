import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { updateDocument, UpdateUser, Report } from '../../entities'

export const reportUser = functions.https.onCall(async (data, context) => {
  const uid = context!.auth!.uid
  const reportUID = uid
  const report = data.report as Report
  const reportedUID = report.reportedUID

  const db = firestore()
  const batch = db.batch()
  const reportsRef = db.collection('reports').doc()
  batch.set(reportsRef, updateDocument<Report>(report), { merge: true })

  const userRef = db.collection('users')
  batch.set(
    userRef.doc(reportedUID),
    updateDocument<UpdateUser>({ reportUIDs: firestore.FieldValue.arrayUnion(reportUID) }),
    { merge: true }
  )

  batch.set(
    userRef.doc(reportUID),
    updateDocument<UpdateUser>({ reportedUIDs: firestore.FieldValue.arrayUnion(reportedUID) }),
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
