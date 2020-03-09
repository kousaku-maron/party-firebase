const { execSync } = require('child_process')
const _ = require('lodash')

const time = 60
const per = 10

const project = process.env.PROJECT_ID
const token = process.env.TOKEN

console.log(`Project: ${project}`)

const functions = require('../functions/lib')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

_.chunk(Object.keys(functions), per).forEach(async (names, index) => {
  if (index !== 0) {
    console.log(`wait ${time}s`)
    await sleep(time * 1000)
  }

  const only = names.map(name => `functions:${name}`).join()
  const command = `yarn firebase deploy --force --only ${only} --project ${project} --token ${token}`
  // console.log(`target functions: ${only}`)
  execSync(command, { stdio: 'inherit' })
})
