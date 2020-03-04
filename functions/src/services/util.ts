import { firestore } from 'firebase-admin'

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

export const includesBothArrays = <T>(elements1: T[], elements2: T[]) => {
  for (const element1 of elements1) {
    if (elements2.includes(element1)) {
      return { result: true, element: element1 }
    }
  }
  return { result: false, element: null }
}
