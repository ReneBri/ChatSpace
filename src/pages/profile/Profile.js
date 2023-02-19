// styles
import './Profile.css'

// hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAddFriend } from '../../hooks/useAddFriend'

// config
import { projectFirestore } from '../../config/config'

// components
import FriendList from '../../components/FriendList'
import NewsfeedPosts from '../../components/NewsfeedPosts'
import AboutUser from '../../components/AboutUser'



export default function Profile() {

  const params = useParams()

  const { user } = useAuthContext()

  const { isPending, addFriendError, addFriend } = useAddFriend()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)

  const fetchProfile = async (profileUrl) => {
    setIsLoading(true)
    setError(null)

    try{
      let profile = {}
      const snapshot = await projectFirestore.collection('userProfiles').where("userProfileUrl", "==", profileUrl).get()
      snapshot.forEach((doc) => {
        profile = {...doc.data()}
      })
      if (!isCancelled){
        setUserProfile(profile)
        setIsLoading(false)
        setError(null)
      }
      
    }
    catch (err) {
      if (!isCancelled){
        setIsLoading(false)
        setError(err.message)
      }
    }

    return () => setIsCancelled(true)
  }

  useEffect(() => {
    fetchProfile(params.profileUrl)
  }, [user.friendList, params.profileUrl])
  
  // console.log(userProfile)

  return (
    <div className="profile-wrapper">
      {error && <h1>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {userProfile && 
      <div>
        <div className="cover-photo">
        </div>
        <div className="user-info">
          <div className="profile-avatar">
            <img src={userProfile.avatarUrl} alt="user profile avatar" />
          </div>
          <div className="user-info-text">
            <h1>{userProfile.firstName} {userProfile.lastName}</h1>
            <p>{userProfile.age} - Originally from {userProfile.hometown}.</p>
            <p>Currently lives in {userProfile.currentCity}</p>
            {!user.friendList.includes(userProfile.userId) &&
            user.userId !== userProfile.userId && 
            <button onClick={() => {addFriend(user.userId, userProfile.userId)}}>add friend</button>}
          </div>
        </div>

        <div className="main-content-container">

          <div className="friends-list-container">
            <div className="explore-users-header">
              <p>{userProfile.firstName}'s Friends</p>
            </div>
            <FriendList databaseQuery="userId" dbq2="in" dbq3={userProfile.friendList} is />
          </div>

          <div className="news-feed-container">
          <div className="newsfeed-header">
            <p>{userProfile.firstName}'s Posts</p>
          </div>
            <NewsfeedPosts collection='newsfeedPosts' query={["posterId", "==", userProfile.userId]} orderBy={["createdAt", "desc"]}/>
          </div>
          
          <div className="about-user-container">
            <div className="explore-users-header">
              <p>About {userProfile.firstName}</p>
            </div>
            <AboutUser userProfile={userProfile} />
          </div>

        </div>
      </div>}
    </div>
  )
}

