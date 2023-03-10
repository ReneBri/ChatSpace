import { useEffect, useState } from "react"
import { projectFirestore } from '../config/config'


export const useFirestore = (collection) => {

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirestore.collection(collection)

    const addDocument = async (doc) => {
        setIsPending(true)
        setError(null)

        try {
            const addedDoc = await ref.add(doc)

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setIsPending(false)
                setError("ERROR: ", err.message)
            }
        }
        
    }

    const updateDocument = async (docId, toToggle, target) => {
        setIsPending(true)
        setError(null)

        let inputToggle = toToggle

        toToggle ? inputToggle = false : inputToggle = true

        let targetValue = {}

        if (target === "showComments"){
            targetValue = { showComments: inputToggle }
        } else if (target === "showCommentBox") {
            targetValue = { showCommentBox: inputToggle }
        } 

        try {
            await ref.doc(docId).update(targetValue) 

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setIsPending(false)
                setError("ERROR: ", err.message)
            }
        }

    }


    const updateStatus = async (userId, newStatus) => {
        setIsPending(true)
        setError(null)

        let target = { status: newStatus }

        console.log(userId, newStatus, target)

        try {
            await ref.doc(userId).update({status: newStatus}) 

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setIsPending(false)
                setError("ERROR: ", err.message)
                console.log(error)
            }
        }

    }



    
    const addComment = async (docId, newComments) => {
        setIsPending(true)
        setError(null)

        console.log(5)
        try {
            await ref.doc(docId).update({comments: newComments}) 
            console.log(5)
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setIsPending(false)
                setError("ERROR: ", err.message)
            }
        }
    }
    

    // clean up funtion
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isPending, error, addDocument, updateDocument, addComment, updateStatus }
}