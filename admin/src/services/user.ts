import { useState, useEffect, useCallback } from 'react'
import { db } from '../repositories/firebase'
import { User, buildUser } from '../entities'
import { getUser, setUser } from '../repositories/user'

const usersRef = db.collection('users')

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unsubscribe = usersRef.onSnapshot({
      next: (snapshot: firebase.firestore.QuerySnapshot) => {
        const users = snapshot.docs.map(doc => {
          const user = buildUser(doc.data())
          return user
        })

        setUsers(users)
      },
      error: (error: Error) => {
        console.warn(error)
      },
      complete: () => {
        // console.info('query snapshot end!')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return users
}

export const useUserToggleActions = () => {
  const onToggleEnabled = useCallback(async (uid: string) => {
    try {
      const user = await getUser(uid)
      if (!user) {
        throw new Error('not found user.')
      }

      const { result } = await setUser(uid, { enabled: !user.enabled })
      return { result }
    } catch (e) {
      console.warn(e)
      return { error: e }
    }
  }, [])

  const onChangeEnabled = useCallback(async (uid: string, checked: boolean) => {
    try {
      const { result } = await setUser(uid, { enabled: checked })
      return { result }
    } catch (e) {
      console.warn(e)
      return { error: e }
    }
  }, [])

  const onToggleIsAccepted = useCallback(async (uid: string) => {
    try {
      const user = await getUser(uid)
      if (!user) {
        throw new Error('not found user.')
      }

      const { result } = await setUser(uid, { isAccepted: !user.isAccepted })
      return { result }
    } catch (e) {
      console.warn(e)
      return { error: e }
    }
  }, [])

  const onChangeIsAccepted = useCallback(async (uid: string, checked: boolean) => {
    try {
      const { result } = await setUser(uid, { isAccepted: checked })
      return { result }
    } catch (e) {
      console.warn(e)
      return { error: e }
    }
  }, [])

  return { onToggleEnabled, onToggleIsAccepted, onChangeEnabled, onChangeIsAccepted }
}
