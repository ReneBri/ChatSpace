// styles 
import './ExploreUsers.css'

// config
import { projectFirestore } from '../config/config'
import React from 'react'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import { useAddFriend } from '../hooks/useAddFriend'

export default function ExploreUsers() {

    const { user } = useAuthContext()

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        // use the if/else statement becasue we cannot pass firebase an empty array
        if (user.friendList.length !== 0){

            let ref = projectFirestore.collection('userProfiles').where("userId", "not-in", user.friendList)

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
            
        } else {

            let ref = projectFirestore.collection('userProfiles')

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
        
        
    }, [user.friendList])
    
    const {isPending, addFriendError, addFriend } = useAddFriend()


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
            {error && <p>{error}</p>}
            {!documents && <p>Loading...</p>}
            {documents && documents.map((profile) => {
                return profile.userId !== user.userId ? <div className="user-profile-thumbnail" key={profile.userId}>
                        <div className="user-thumbnail-img">
                            <img src={profile.avatarUrl} alt="user profile avatar" />
                        </div>
                        <div className="user-thumbnail-text">
                            <h3 onClick={() => routeChange(profile.userProfileUrl)}>{profile.firstName} {profile.lastName}</h3>
                            <span>{profile.hometown}</span>
                            <p>{profile.status}</p>
                            
                        </div>
                            <button className="thumbnail-add-friend-btn" onClick={() => addFriend(user.uid, profile.userId)}>add friend</button>
                       </div>
                       : <React.Fragment key={profile.userId}></React.Fragment>
            })}
        </div>
    </div>
  )
}
