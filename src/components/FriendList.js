// styles
import './FriendList.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";

export default function FriendList(props) {

    const { user } = useAuthContext()

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        if(props.dbq3.length === 0){

        }else{
            let ref = projectFirestore.collection('userProfiles').where(props.databaseQuery, props.dbq2, props.dbq3)

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
        }
        
       
        
    }, [props.dbq3])


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
            {!documents && <p>No friends yet. Be their first?</p>}
            {documents && documents.map((friend) => {
                return user.userId != friend.userId ? <div className="user-profile-thumbnail" onClick={() => routeChange(friend.userProfileUrl)} key={user.userId}>
                        <div className="user-thumbnail-img">
                        </div>
                        <div className="user-thumbnail-text">
                            <h3>{friend.firstName} {friend.lastName}</h3>
                            <span><b><i>{friend.hometown}</i></b></span>
                            <p>{friend.status}</p>
                        </div>
                       </div>
                       : <></>
            })}
        </div>
    </div>
  )
}
