import { firestore } from 'firebase-admin'
import { createHash } from 'crypto'

// MEMO: https://qiita.com/hiko1129/items/9de868bec465d725f90b
export const getRandomID = () => {
  const db = firestore()
  return db.collection('hoge').doc().id
}

export const shuffle = <T>(targets: T[]) => {
  const newTargets = targets.slice()
  for (let i = newTargets.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swapTarget = newTargets[i]
    newTargets[i] = newTargets[j]
    newTargets[j] = swapTarget
  }
  return newTargets
}

export const createListHash = (list: string[]) => {
  const baseStr = list.slice().sort().join('')
  const newHash = createHash('sha256')
    .update(baseStr, 'utf8')
    .digest('hex')

  return newHash
}
