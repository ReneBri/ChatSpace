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

    let tempFriendList = []

    const { user, dispatch } = useAuthContext()

    const getAndUpdateCollection = async (docToUpdate, friendToAdd) => {
        const response = await projectFirestore.collection('userProfiles').doc(docToUpdate).get()
        if(response.exists){
            console.log("doc: ", response.data())
            if(!response.data().friendList.includes(friendToAdd)){
                let friendList = response.data().friendList
                friendList = [ ...friendList, friendToAdd]
                await projectFirestore.collection('userProfiles').doc(docToUpdate).update({ friendList })
                console.log("Document sucessfully changed")
                tempFriendList = friendList
                console.log(user)
            }
        }else{
            console.log("no such document for: ", docToUpdate)
        }
        
    }

    const addFriend = async (userId, newFriendId) => {
        try{
            setIsPending(true)
            setAddFriendError(null)

            await getAndUpdateCollection(userId, newFriendId)
            user.friendList = tempFriendList
            await getAndUpdateCollection(newFriendId, userId)
            

            if (!isCancelled) {
                dispatch({ type: 'ADD_FRIEND', payload: user })
                
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