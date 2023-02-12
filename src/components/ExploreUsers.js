// styles 
import './ExploreUsers.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";

export default function ExploreUsers() {

    const { user } = useAuthContext()

    // console.log(user.uid)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userProfiles, setUserProfiles] = useState([])

    const getUserProfiles = async () => {

        setIsLoading(true)
        setError(null)

       try{
        const tempUserArray = []

        const snapshot = await projectFirestore.collection('userProfiles').where("userId", "not-in", user.friendList).get()
        snapshot.forEach(doc => {
            tempUserArray.push(doc.data())
        })
        
        setUserProfiles(tempUserArray)
        setIsLoading(false)

       }
       catch (err) {
        setError("error is ", err.message)
        console.log(error)
       }
        
    }
    
    useEffect(() => {
        getUserProfiles()  
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
            <p>Explore Users</p>
        </div>
        <div className="explore-users-main-content">
            {!isLoading && userProfiles.map((user) => {
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
