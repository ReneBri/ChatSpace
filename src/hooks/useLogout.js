import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../config/config'

export const useLogout = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const logout = async () => {
            setIsPending(true)
            setError(null)
    
            try {
                await projectAuth.signOut()

                dispatch({ type: 'LOGOUT', payload: null })

                if (!isCancelled) {
                    setIsPending(false)
                    setError(null)
                }
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

    return { logout, isPending, error}
    
}