// styles
import './FriendList.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import { useCollection } from '../hooks/useCollection'

export default function FriendList() {

    const { user } = useAuthContext()

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        let ref = projectFirestore.collection('userProfiles').where("userId", "in", user.friendList)

            const unsubscribe = ref.onSnapshot((querySnapshot) => {
                let friends = []
                querySnapshot.forEach((doc) => {
                    friends.push(doc.data())
                })
                setDocuments(friends)
                setError(null)
            }, (err) => {
                setError(err.message)
            })
            return () => unsubscribe()
        
    }, [user.friendList])


    // create links for each profile
    let navigate = useNavigate(); 
    const routeChange = (userProfileUrl) =>{ 
        let path = `/userProfile/${userProfileUrl}`; 
        navigate(path);
      }
    

    
  return (
    <div>
        <div className="explore-users-header">
            <p>Friends List</p>
        </div>
        <div className="explore-users-main-content">
            {error && <p>{error}</p>}
            {documents && documents.map((user) => {
                return <div className="user-profile-thumbnail" onClick={() => routeChange(user.userProfileUrl)} key={user.userId}>
                        <div className="user-thumbnail-img">
                        </div>
                        <div className="user-thumbnail-text">
                            <h3>{user.firstName} {user.lastName}</h3>
                            <span><b><i>{user.hometown}</i></b></span>
                            <p>{user.status}</p>
                        </div>
                       </div>
            })}
        </div>
    </div>
  )
}
