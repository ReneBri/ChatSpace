import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../config/config'


export const useSignup = () => {

    const { dispatch } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

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

             dispatch({ type: 'LOGIN', payload: res.user})

            //  if (!isCancelled) {
                setIsPending(false)
                setError(null)
            // }
        }
        catch (err) {
            if (!isCancelled){
                setIsPending(false)
                setError(err.message)
            }
         }
    }

    // cleanup function
    useEffect(() => {
        return () => {setIsCancelled(true)}
    }, [])

    return { signup, isPending, error }
}
