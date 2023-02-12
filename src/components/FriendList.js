// styles
import './FriendList.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";

export default function FriendList() {

    const { user } = useAuthContext()

    // console.log(user.uid)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [friendProfiles, setFriendProfiles] = useState([])

    const getFriendProfiles = async () => {

        setIsLoading(true)
        setError(null)

       try{
        const tempFriendArray = []

        const snapshot = await projectFirestore.collection('userProfiles').where("userId", "in", user.friendList).get()
        snapshot.forEach(doc => {
            tempFriendArray.push(doc.data())
        })
        
        setFriendProfiles(tempFriendArray)
        setIsLoading(false)

       }
       catch (err) {
        setError("err")
        console.log(error)
       }
        
    }
    
    useEffect(() => {
        getFriendProfiles()  
    }, [])



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
            {!isLoading && friendProfiles.map((user) => {
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
