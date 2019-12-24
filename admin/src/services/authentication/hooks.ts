import { useEffect, useState } from 'react'
import firebase from '../../repositories/firebase'
import { signInFacebook } from './facebook'

export const useAuthState = () => {
  const [uid, setUID] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUID(user.uid)
        return
      }
      signInFacebook()
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { uid }
}
