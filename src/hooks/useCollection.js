import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '../config/config'
import { useAuthContext } from './useAuthContext'


export const useCollection = (collection, _query, _orderBy) => {

    // const { user } = useAuthContext()

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if we don't use a ref then an infinite loop will happen in use effect
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError(error.message)
        })

        // unsub on unmount
        return () => unsubscribe()

    }, [collection, query])

    return { documents, error }
}

// maybe I need to update user - look at this - https://stackoverflow.com/questions/70214878/react-usestate-and-firebase-onsnapshot