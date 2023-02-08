import { useEffect, useState } from "react"
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../config/config'


export const useLogin = () => {

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isPending, error, login }
}