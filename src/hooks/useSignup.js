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

            // create a new userProfile document in Firestore
            await projectFirestore.collection('userProfiles').doc(res.user.uid).set(userObject)

            const userProfileDocument = await projectFirestore.collection('userProfiles').doc(res.user.uid).get()
            
            ///////////////////////////////

            dispatch({ type: 'LOGIN', payload: { ...res.user, ...userProfileDocument.data() } })

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
    // the only reason we need clean up functions isnt because of updating Firebase,
    // its so we dont update the local state
    useEffect(() => {
        return () => {setIsCancelled(true)}
    }, [])

    return { signup, isPending, error }
}
