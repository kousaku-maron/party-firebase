import * as admin from 'firebase-admin'
admin.initializeApp()

export { helloWorld } from './handlers/hello'

export { updateUserID } from './handlers/user'
export { createUser } from './triggers/user'
