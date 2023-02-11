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

    // clean up funtion
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isPending, error, addDocument }
}