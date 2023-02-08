import { AuthContext } from '..context/AuthContext'
import { useContext } from 'react'

// this is one we could skip if we wanted and use this directly in a component withoug
// this whole step
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // this is really for is you only wrap a subset of pages or components
    if(!context){
        throw Error('useAuthContext must be inside an AuthContext provider')
    }

    return context
}