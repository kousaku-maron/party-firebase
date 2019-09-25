import * as admin from 'firebase-admin'
admin.initializeApp()

export { helloWorld } from './handlers/hello'

export { createUser } from './triggers/user'
