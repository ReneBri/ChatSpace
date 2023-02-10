import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../config/config'
import { projectFirestore } from '../config/config'


export const useSignup = () => {

    const { dispatch } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email, password, firstName, lastName, age, currentCity, hometown, status) => {

        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user.uid)

            if (!res) {
                throw new Error('could not complete signup')
            }

            // create profile document here
            const userObject = {
                firstName,
                lastName,
                age,
                currentCity,
                hometown,
                status,
                userId: res.user.uid,
                friendList: [],
                coverPhotoUrl: "",
                isOnline: true,
                email
            }

            console.log(userObject)

            await projectFirestore.collection('userProfiles').doc(res.user.uid).set(userObject)
            
            ///////////////////////////////

            dispatch({ type: 'LOGIN', payload: res.user})

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

    return { signup, isPending, error }
}
