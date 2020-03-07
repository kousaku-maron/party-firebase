const { execSync } = require('child_process')
const _ = require('lodash')

const project = process.env['FIREBASE_PROJECT_NAME']
const token = process.env['FIREBASE_DEPLOY_TOKEN']

console.log(`Project: ${project}`)

const functions = require('../functions/lib')

_.chunk(Object.keys(functions), 15).forEach(names => {
  const only = names.map(name => `functions:${name}`).join()
  // const command = `firebase deploy --force --only ${only} --project ${project} --token ${token}`
  const command = `firebase deploy --force --only ${only}`
  console.log(`target functions: ${only}`)
  execSync(command, { stdio: 'inherit' })
})
