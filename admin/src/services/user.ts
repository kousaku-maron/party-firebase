import { useState, useEffect } from 'react'
import { db } from '../repositories/firebase'
import { User, buildUser } from '../entities'

const usersRef = db.collection('users')

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unscribe = usersRef.onSnapshot({
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
      unscribe()
    }
  }, [])

  return users
}
