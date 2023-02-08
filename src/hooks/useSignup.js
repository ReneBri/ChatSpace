import { useState } from 'react'
import { projectAuth } from '../config/config'


export const useSignup = () => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const signup = async (email, password, displayName) => {

        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res)

            if (!res) {
                throw new Error('could not complete signup')
             }

             await res.user.updateProfile({ displayName })

             setIsPending(false)
             setError(null)
         }
         catch (err) {
            console.log(err.message)
             setError(err.message)
             setIsPending(false)
         }
    }
    return { signup, isPending, error }
}
