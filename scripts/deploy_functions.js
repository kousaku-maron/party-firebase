const { execSync } = require('child_process')
const _ = require('lodash')

const project = process.argv[0]
const token = process.argv[1]

console.log(`Project: ${project}`)

const functions = require('../functions/lib')

_.chunk(Object.keys(functions), 15).forEach(names => {
  const only = names.map(name => `functions:${name}`).join()
  const command = `firebase deploy --force --only ${only} --project ${project} --token ${token}`
  console.log(`target functions: ${only}`)
  execSync(command, { stdio: 'inherit' })
})
