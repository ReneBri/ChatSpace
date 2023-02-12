// hooks
import { createContext, useEffect, useReducer } from 'react'
import { projectAuth, projectFirestore } from '../config/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_FRIEND':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            return { ...state, user: action.payload }

        case 'LOGIN':
            return { ...state, user: action.payload }

        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }

        default:
            return state

    }
}

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false })

    //checking for user upon refresh of first load
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            // concats the user profile data and the firebase user data
            if (user) {
                projectFirestore.collection('userProfiles').doc(user.uid).get()
                .then((doc) => {
                    dispatch({ type: 'AUTH_IS_READY', payload: { ...user, ...doc.data() } }) 
                })
            } else {
                dispatch({ type: 'AUTH_IS_READY', payload: user })
            }
            
            unsub()
        })
    }, [])

    console.log(state)

    return (
        <AuthContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}