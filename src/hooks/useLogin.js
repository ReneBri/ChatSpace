import { useEffect, useState } from "react"
import { useAuthContext } from './useAuthContext'
import { projectAuth, projectFirestore } from '../config/config'


export const useLogin = () => {

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsPending(true)
        setError(null)

        try {
            // signs in and recieves a response token from Firebase
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            // fetches the user profile document associated with that users firebase id
            const userProfileDocument = await projectFirestore.collection('userProfiles').doc(res.user.uid).get()
            // concats the user profile data and the firebase user data
            dispatch({ type: 'LOGIN', payload: { ...res.user, ...userProfileDocument.data() } })

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