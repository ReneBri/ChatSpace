// config
import { projectFirestore } from '../config/config'

// hooks
import { useState } from 'react'

// context
import { useAuthContext } from '../hooks/useAuthContext'

export const useAddFriend = () => {

    const [isPending, setIsPending] = useState(false)
    const [addFriendError, setAddFriendError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    const { user, dispatch } = useAuthContext()

    const addFriend = async (userId, newFriendId) => {
        try{
            setIsPending(true)
            setAddFriendError(null)

            const response = await projectFirestore.collection('userProfiles').doc(userId).get()
            if(response.exists){
                console.log("doc: ", response.data())
            }else{
                console.log("no such document for: ", userId)
            }
            let friendList = response.data().friendList
            // console.log(friendList)
            friendList = [ ...friendList, newFriendId]
            await projectFirestore.collection('userProfiles').doc(userId).update({ friendList })
            console.log("Document sucessfully changed")
            user.friendList = friendList

            if (!isCancelled) {
                dispatch({ type: 'ADD_FRIEND', payload: user })
                console.log(user)
                setIsPending(false)
                setAddFriendError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setAddFriendError(err.message)
                setIsPending(false)
                console.log("error", addFriendError)
            }
        }
        
        return () => setIsCancelled(true)
        
    } 

    return { isPending, addFriendError, addFriend }
}