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
                email,
                avatarUrl: '/avatar-adventurer-9.png',
                about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse felis dolor, tincidunt eget pellentesque tristique, laoreet ac ante. Donec feugiat a sapien id vehicula. Aenean maximus eros nunc, et finibus sapien pretium ut. Maecenas tristique non massa id cursus. Nullam tincidunt quam eget turpis dapibus lacinia. Proin id leo laoreet, mattis nibh non, molestie erat. Suspendisse potenti. Sed at ullamcorper lorem. Phasellus dignissim consectetur quam.',
                userProfileUrl: firstName + lastName
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
