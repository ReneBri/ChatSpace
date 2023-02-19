// styles
import './FriendList.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// context
import { useAuthContext } from '../hooks/useAuthContext'


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
        navigate('/');
        navigate(path, { replace: true });
        
      }
    

    
  return (
    <div>
        
        <div className="explore-users-main-content">
            {error && <p>{error}</p>}
            {!documents && <p>No friends yet!</p>}
            {documents && documents.map((friend) => {
                return <div className="user-profile-thumbnail" key={friend.userId}>
                        <div className="user-thumbnail-img">
                        <img src={friend.avatarUrl} alt="user profile avatar" />
                        </div>
                        <div className="user-thumbnail-text">
                            <h3 onClick={() => routeChange(friend.userProfileUrl)} >{friend.firstName} {friend.lastName}</h3>
                            <span>{friend.hometown}</span>
                            <p>{friend.status}</p>
                        </div>
                       </div>
            })}
        </div>
    </div>
  )
}
