import { useEffect, useState, useCallback } from 'react'
import firebase from '../../repositories/firebase'
import { signInFacebook } from './facebook'
import { signOut } from './signout'

export const useAuthState = () => {
  const [uid, setUID] = useState<string | null>(null)

  const onSignOut = useCallback(() => {
    if (!uid) {
      console.warn('you must be signed in to sign out')
      return
    }
    signOut()
  }, [uid])

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUID(user.uid)
        return
      }
      signInFacebook() // TODO: ログインボタンを表示してログイン処理走らせるように修正。
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { uid, onSignOut }
}
