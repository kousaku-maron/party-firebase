const { execSync } = require('child_process')
const _ = require('lodash')

const project = process.env.PROJECT_ID
const token = process.env.TOKEN

console.log(`Project: ${project}`)

const functions = require('../functions/lib')

_.chunk(Object.keys(functions), 10).forEach(names => {
  const only = names.map(name => `functions:${name}`).join()
  const command = `yarn firebase deploy --force --only ${only} --project ${project} --token ${token}`
  console.log(`target functions: ${only}`)
  execSync(command, { stdio: 'inherit' })
})
